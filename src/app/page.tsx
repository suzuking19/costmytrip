import SignoutButton from "@/features/auth/SignoutButton";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">CostMyTrip</h1>
      <SignoutButton />
    </div>
  );
}
