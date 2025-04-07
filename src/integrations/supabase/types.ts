export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          age: number
          age_group: Database["public"]["Enums"]["age_group"]
          contact: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          lighthouse_work: string
          needs_accommodation: boolean
          other_lighthouse_work: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          age: number
          age_group: Database["public"]["Enums"]["age_group"]
          contact: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          lighthouse_work: string
          needs_accommodation?: boolean
          other_lighthouse_work?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          age?: number
          age_group?: Database["public"]["Enums"]["age_group"]
          contact?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          lighthouse_work?: string
          needs_accommodation?: boolean
          other_lighthouse_work?: string | null
          updated_at?: string
          user_id?: string | null
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
      age_group: "Children" | "YP" | "SWYP" | "Adult" | "Senior"
      app_role: "admin" | "user"
      seat_status: "available" | "reserved" | "occupied"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      age_group: ["Children", "YP", "SWYP", "Adult", "Senior"],
      app_role: ["admin", "user"],
      seat_status: ["available", "reserved", "occupied"],
    },
  },
} as const
