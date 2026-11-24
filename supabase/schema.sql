create extension if not exists pgcrypto;
create table if not exists public.bookings (
 id uuid primary key default gen_random_uuid(),
 reference text unique not null,
 customer_name text not null,
 phone text not null,
 email text,
 category text not null,
 event_date date not null,
 event_time time,
 location text not null,
 budget text,
 requirements text,
 status text not null default 'new' check (status in ('new','contacted','quoted','confirmed','completed','cancelled')),
 payment_status text not null default 'pending' check (payment_status in ('pending','advance_paid','part_paid','paid','refunded')),
 quoted_amount numeric(12,2),
 advance_amount numeric(12,2),
 assigned_photographer text,
 created_at timestamptz not null default now()
);
alter table public.bookings enable row level security;
-- Do not add public SELECT/UPDATE policies. Booking inserts are performed by the server API
-- using SUPABASE_SERVICE_ROLE_KEY, which must never be exposed to the browser.
-- Add authenticated admin-only policies after configuring Supabase Auth and admin roles.