import { WhatsAppForm } from "@/components/WhatsAppForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">WhatsApp Direct</h1>
          <p className="text-gray-500">
            Send a message without the need to save contact
          </p>
        </div>
        <WhatsAppForm />
      </div>
    </div>
  );
};

export default Index;