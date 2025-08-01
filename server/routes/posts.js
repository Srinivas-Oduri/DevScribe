import express from 'express';
import supabase from '../config/database.js';
import crypto from 'crypto';
const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('posts')
      .select(`
        *,
        categories (
          id,
          name,
          color
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false });

    if (category) {
      query = query.eq('category_id', category);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    const { data: posts, error, count } = await query
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      posts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalPosts: count
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        categories (
          id,
          name,
          color
        )
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new post
router.post('/', async (req, res) => {
  try {
    const { title, content, excerpt, category_id, tags, featured_image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const randomString = crypto.randomBytes(3).toString('hex');
    const slug = `${title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${randomString}`;

    const { data: post, error } = await supabase
      .from('posts')
      .insert([{
        title,
        content,
        excerpt: excerpt || content.substring(0, 200) + '...',
        category_id,
        tags: tags || [],
        featured_image,
        slug
      }])
      .select(`
        *,
        categories (
          id,
          name,
          color
        )
      `)
      .single();

    if (error) throw error;

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const { title, content, excerpt, category_id, tags, featured_image } = req.body;

    const updateData = {
      ...(title && { title }),
      ...(content && { content }),
      ...(excerpt && { excerpt }),
      ...(category_id && { category_id }),
      ...(tags && { tags }),
      ...(featured_image && { featured_image }),
      updated_at: new Date().toISOString()
    };

    if (title) {
      const randomString = crypto.randomBytes(3).toString('hex');
      updateData.slug = `${title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${randomString}`;
    }

    const { data: post, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', req.params.id)
      .select(`
        *,
        categories (
          id,
          name,
          color
        )
      `)
      .single();

    if (error) throw error;

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
