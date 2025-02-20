
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password, firstName, lastName }: WelcomeEmailRequest = await req.json();
    const name = firstName && lastName ? `${firstName} ${lastName}` : "there";

    const emailResponse = await resend.emails.send({
      from: "BBC Registration <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to BBC 50th Anniversary Event - Your Account Details",
      html: `
        <h1>Welcome to BBC 50th Anniversary Event!</h1>
        <p>Hello ${name},</p>
        <p>Your account has been successfully created for the BBC 50th Anniversary Event registration. Here are your login credentials:</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Please keep this information secure. You can use these credentials to log in to your account and manage your event registration.</p>
        <p>We recommend changing your password after your first login.</p>
        <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The BBC Team</p>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
