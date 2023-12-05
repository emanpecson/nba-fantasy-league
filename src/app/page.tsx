import RouteButton from '@/components/RouteButton';

export default function LandingPage() {
  return (
    <div className="flex justify-center h-full">
      <div>
        {/* header */}
        <div className="py-6">
          <h1 className="text-4xl font-semibold">NBA Fantasy League</h1>
          <p className="flex justify-center pt-2 text-gray-500">short description</p>
        </div>

        {/* action buttons */}
        <div className="flex space-x-1.5 justify-center">
          <RouteButton route="/login">Login</RouteButton>
          <RouteButton route="/signup">Sign up</RouteButton>
        </div>

        {/* app image */}
      </div>
      <div className="bg-gray-200 bottom-0 absolute h-60 w-[40rem] rounded-2xl">
        <p className="flex justify-center place-items-center h-full">placeholder</p>
      </div>
    </div>
  );
}
