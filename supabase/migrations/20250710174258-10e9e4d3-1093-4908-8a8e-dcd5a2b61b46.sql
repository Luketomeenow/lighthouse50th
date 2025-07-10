-- Add new enums for the registration system
CREATE TYPE public.gender_type AS ENUM ('male', 'female');
CREATE TYPE public.civil_status_type AS ENUM ('single', 'married', 'widowed', 'separated', 'divorced');
CREATE TYPE public.education_level_type AS ENUM ('elementary', 'high_school', 'vocational', 'college', 'graduate', 'post_graduate');
CREATE TYPE public.payment_mode_type AS ENUM ('cash', 'gcash', 'bank_transfer', 'other');
CREATE TYPE public.accommodation_type AS ENUM ('none', 'hotel', 'homestay', 'church_accommodation');

-- Create storage bucket for payment proofs
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-proofs', 'payment-proofs', false);

-- Create policies for payment proofs bucket
CREATE POLICY "Users can upload their payment proofs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'payment-proofs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their payment proofs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'payment-proofs' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can view all payment proofs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'payment-proofs' AND EXISTS (
  SELECT 1 FROM user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'::app_role
));

-- Add new columns to registrations table
ALTER TABLE public.registrations 
ADD COLUMN middle_name TEXT,
ADD COLUMN home_address TEXT,
ADD COLUMN birthday DATE,
ADD COLUMN gender gender_type,
ADD COLUMN civil_status civil_status_type,
ADD COLUMN education_level education_level_type,
ADD COLUMN school_name TEXT,
ADD COLUMN course_vocation TEXT,
ADD COLUMN work_nature_role TEXT,
ADD COLUMN company_name TEXT,
ADD COLUMN date_saved DATE,
ADD COLUMN date_baptized DATE,
ADD COLUMN former_church_details TEXT,
ADD COLUMN date_transferred DATE,
ADD COLUMN payment_mode payment_mode_type,
ADD COLUMN payment_proof_url TEXT,
ADD COLUMN payment_amount DECIMAL(10,2),
ADD COLUMN accommodation_type accommodation_type,
ADD COLUMN special_requirements TEXT,
ADD COLUMN data_processing_consent BOOLEAN DEFAULT false,
ADD COLUMN record_update_consent BOOLEAN DEFAULT false;