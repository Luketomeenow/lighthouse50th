export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      event_settings: {
        Row: {
          created_at: string
          event_date_end: string
          event_date_start: string
          event_title: string
          header_video_url: string
          id: string
          updated_at: string
          venue: string
        }
        Insert: {
          created_at?: string
          event_date_end?: string
          event_date_start?: string
          event_title?: string
          header_video_url?: string
          id?: string
          updated_at?: string
          venue?: string
        }
        Update: {
          created_at?: string
          event_date_end?: string
          event_date_start?: string
          event_title?: string
          header_video_url?: string
          id?: string
          updated_at?: string
          venue?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          accommodation_type:
            | Database["public"]["Enums"]["accommodation_type"]
            | null
          age: number
          age_group: Database["public"]["Enums"]["age_group"]
          birthday: string | null
          civil_status: Database["public"]["Enums"]["civil_status_type"] | null
          company_name: string | null
          contact: string
          course_vocation: string | null
          created_at: string
          data_processing_consent: boolean | null
          date_baptized: string | null
          date_saved: string | null
          date_transferred: string | null
          education_level:
            | Database["public"]["Enums"]["education_level_type"]
            | null
          email: string
          first_name: string
          former_church_details: string | null
          gender: Database["public"]["Enums"]["gender_type"] | null
          home_address: string | null
          id: string
          last_name: string
          lighthouse_work: string
          middle_name: string | null
          needs_accommodation: boolean
          other_lighthouse_work: string | null
          payment_amount: number | null
          payment_mode: Database["public"]["Enums"]["payment_mode_type"] | null
          payment_proof_url: string | null
          record_update_consent: boolean | null
          school_name: string | null
          special_requirements: string | null
          updated_at: string
          user_id: string | null
          work_nature_role: string | null
        }
        Insert: {
          accommodation_type?:
            | Database["public"]["Enums"]["accommodation_type"]
            | null
          age: number
          age_group: Database["public"]["Enums"]["age_group"]
          birthday?: string | null
          civil_status?: Database["public"]["Enums"]["civil_status_type"] | null
          company_name?: string | null
          contact: string
          course_vocation?: string | null
          created_at?: string
          data_processing_consent?: boolean | null
          date_baptized?: string | null
          date_saved?: string | null
          date_transferred?: string | null
          education_level?:
            | Database["public"]["Enums"]["education_level_type"]
            | null
          email: string
          first_name: string
          former_church_details?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          home_address?: string | null
          id?: string
          last_name: string
          lighthouse_work: string
          middle_name?: string | null
          needs_accommodation?: boolean
          other_lighthouse_work?: string | null
          payment_amount?: number | null
          payment_mode?: Database["public"]["Enums"]["payment_mode_type"] | null
          payment_proof_url?: string | null
          record_update_consent?: boolean | null
          school_name?: string | null
          special_requirements?: string | null
          updated_at?: string
          user_id?: string | null
          work_nature_role?: string | null
        }
        Update: {
          accommodation_type?:
            | Database["public"]["Enums"]["accommodation_type"]
            | null
          age?: number
          age_group?: Database["public"]["Enums"]["age_group"]
          birthday?: string | null
          civil_status?: Database["public"]["Enums"]["civil_status_type"] | null
          company_name?: string | null
          contact?: string
          course_vocation?: string | null
          created_at?: string
          data_processing_consent?: boolean | null
          date_baptized?: string | null
          date_saved?: string | null
          date_transferred?: string | null
          education_level?:
            | Database["public"]["Enums"]["education_level_type"]
            | null
          email?: string
          first_name?: string
          former_church_details?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          home_address?: string | null
          id?: string
          last_name?: string
          lighthouse_work?: string
          middle_name?: string | null
          needs_accommodation?: boolean
          other_lighthouse_work?: string | null
          payment_amount?: number | null
          payment_mode?: Database["public"]["Enums"]["payment_mode_type"] | null
          payment_proof_url?: string | null
          record_update_consent?: boolean | null
          school_name?: string | null
          special_requirements?: string | null
          updated_at?: string
          user_id?: string | null
          work_nature_role?: string | null
        }
        Relationships: []
      }
      seat_blocks: {
        Row: {
          available_seats: number
          created_at: string
          id: string
          name: string
          total_seats: number
          updated_at: string
        }
        Insert: {
          available_seats: number
          created_at?: string
          id?: string
          name: string
          total_seats: number
          updated_at?: string
        }
        Update: {
          available_seats?: number
          created_at?: string
          id?: string
          name?: string
          total_seats?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      is_admin: {
        Args: { uid: string }
        Returns: boolean
      }
    }
    Enums: {
      accommodation_type: "none" | "hotel" | "homestay" | "church_accommodation"
      age_group: "Children" | "YP" | "SWYP" | "Adult" | "Senior"
      app_role: "admin" | "user"
      civil_status_type:
        | "single"
        | "married"
        | "widowed"
        | "separated"
        | "divorced"
      education_level_type:
        | "elementary"
        | "high_school"
        | "vocational"
        | "college"
        | "graduate"
        | "post_graduate"
      gender_type: "male" | "female"
      payment_mode_type: "cash" | "gcash" | "bank_transfer" | "other"
      seat_status: "available" | "reserved" | "occupied"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      accommodation_type: ["none", "hotel", "homestay", "church_accommodation"],
      age_group: ["Children", "YP", "SWYP", "Adult", "Senior"],
      app_role: ["admin", "user"],
      civil_status_type: [
        "single",
        "married",
        "widowed",
        "separated",
        "divorced",
      ],
      education_level_type: [
        "elementary",
        "high_school",
        "vocational",
        "college",
        "graduate",
        "post_graduate",
      ],
      gender_type: ["male", "female"],
      payment_mode_type: ["cash", "gcash", "bank_transfer", "other"],
      seat_status: ["available", "reserved", "occupied"],
    },
  },
} as const
