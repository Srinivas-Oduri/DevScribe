# Personal Blog - MERN Stack

A modern personal blog application built with React, Express.js, Node.js, and Supabase (PostgreSQL).

## Features

- **Full CRUD Operations**: Create, read, update, and delete blog posts
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Rich Content Management**: Post categories, tags, and featured images
- **Search & Filter**: Find posts by title, content, or category
- **Admin Dashboard**: Comprehensive admin panel for content management
- **SEO Friendly**: Clean URLs and proper meta information

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, React Router
- **Backend**: Express.js, Node.js
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Quick Start

### Prerequisites

Before running this project, you need to set up Supabase:

1. Click the "Connect to Supabase" button in the top right of the interface
2. Follow the setup instructions to create your Supabase project
3. The necessary environment variables will be automatically configured

### Database Schema

Once Supabase is connected, create the following tables:

#### Categories Table
```sql
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  color text default '#6B7280',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table categories enable row level security;

create policy "Categories are viewable by everyone" on categories
  for select using (true);
```

#### Posts Table
```sql
create table posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  excerpt text,
  slug text unique not null,
  featured_image text,
  tags text[] default '{}',
  category_id uuid references categories(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table posts enable row level security;

create policy "Posts are viewable by everyone" on posts
  for select using (true);

create policy "Authenticated users can insert posts" on posts
  for insert to authenticated with check (true);

create policy "Authenticated users can update posts" on posts
  for update to authenticated using (true);

create policy "Authenticated users can delete posts" on posts
  for delete to authenticated using (true);
```

### Installation & Running

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Servers**:
   ```bash
   npm run dev:full
   ```

   This will start both the Express.js server (port 5000) and React development server (port 5173).

   Alternatively, you can run them separately:
   ```bash
   # Terminal 1 - Backend server
   npm run server

   # Terminal 2 - Frontend development server
   npm run dev
   ```

3. **Access the Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Project Structure

```
├── server/                 # Express.js backend
│   ├── config/            # Database configuration
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
├── src/                   # React frontend
│   ├── components/        # Reusable components
│   ├── context/           # React context for state management
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   └── App.tsx            # Main app component
└── public/                # Static assets
```

## API Endpoints

### Posts
- `GET /api/posts` - Get all posts (with pagination, search, filter)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## Usage

### Creating Posts
1. Navigate to the Admin dashboard
2. Click "New Post"
3. Fill in the post details (title, content, category, tags)
4. Add a featured image URL (optional)
5. Click "Publish Post"

### Managing Content
- Use the Admin dashboard to view, edit, and delete posts
- Create and manage categories for better organization
- Search and filter posts by title, content, or category

### Customization
- Modify the color scheme in `src/pages/` components
- Add new fields to posts by updating the database schema and forms
- Customize the layout in `src/components/layout/`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).