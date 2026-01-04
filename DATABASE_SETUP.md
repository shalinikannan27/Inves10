# Database Setup Instructions

## 📊 Profiles Table Setup

You need to run this SQL in your Supabase SQL Editor to set up the profiles table with Row Level Security.

### Step 1: Create the profiles table

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Users can delete their own profile
CREATE POLICY "Users can delete own profile"
  ON profiles
  FOR DELETE
  USING (auth.uid() = id);
```

### Step 2: Enable Email Auth Provider

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** > **Providers**
3. Ensure **Email** provider is enabled
4. Set **Confirm email** to OFF for testing (or configure email templates)

### Step 3: Test the Setup

Once you've run the SQL, you can test:
1. Sign up with a new account
2. Verify the user appears in Authentication > Users
3. Check that the profile was created in the profiles table

## ✅ You're Ready!

The app will now work with real Supabase authentication!
