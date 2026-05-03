import { Button } from '@/components/ui/button';
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

function Page() {
  return (
    <div className="min-h-screen w-full bg-[#f9fafb] relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)",
        }}
      />
      <div className='flex relative z-10 h-screen flex-col gap-7 justify-center items-center'>
        <h1 className='text-7xl w-3/4 text-center font-bold tracking-tighter'>Stop juggling tools. Start executing</h1>
        <p className='text-sm tracking-tight'>Chat, collaborate, and get work done — all in one place.</p>

        <div className='flex gap-3'>
          <Button className='cursor-pointer text-xs'>
            <RegisterLink>Get Started Free</RegisterLink>
          </Button>
          <Button className='cursor-pointer text-xs' variant={"outline"}>See how it works</Button>
        </div>
      </div>
    </div>
  )
}

export default Page;

