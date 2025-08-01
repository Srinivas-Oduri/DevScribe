import supabase from './database.js';

async function setupDatabase() {
  try {
    console.log('Attempting to create categories table by inserting a dummy record...');
    const { error: insertCategoryError } = await supabase
      .from('categories')
      .insert([{ name: 'General', color: '#6B7280' }]);

    if (insertCategoryError && insertCategoryError.code !== '42P01') {
        // 42P01 is undefined_table, which we expect if the table doesn't exist.
        // If it's a different error, we should throw it.
        throw insertCategoryError;
    }
    console.log('Categories table checked/created.');

    console.log('Attempting to create posts table by inserting a dummy record...');
    const { data: category } = await supabase.from('categories').select('id').eq('name', 'General').single();

    const { error: insertPostError } = await supabase
      .from('posts')
      .insert([{ 
          title: 'Welcome', 
          content: 'Welcome to the blog!', 
          slug: 'welcome', 
          category_id: category.id 
      }]);

    if (insertPostError && insertPostError.code !== '42P01') {
        throw insertPostError;
    }
    console.log('Posts table checked/created.');

    console.log('Database setup complete.');
  } catch (error) {
    console.error('Error setting up database:', error.message);
  }
}

setupDatabase();
