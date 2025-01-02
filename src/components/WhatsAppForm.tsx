import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { countries } from "@/utils/countries";
import { isValidPhoneNumber, formatPhoneNumber } from "@/utils/validation";

export const WhatsAppForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", { selectedCountry, phoneNumber });

    if (!selectedCountry) {
      toast({
        title: "Error",
        description: "Please select a country",
        variant: "destructive",
      });
      return;
    }

    const formattedNumber = formatPhoneNumber(phoneNumber);
    if (!isValidPhoneNumber(formattedNumber)) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const country = countries.find((c) => c.code === selectedCountry);
    const fullNumber = `${country?.dial_code}${formattedNumber}`;
    const whatsappUrl = `https://wa.me/${fullNumber}`;

    console.log("Redirecting to:", whatsappUrl);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      window.location.href = whatsappUrl;
      setIsLoading(false);
    }, 500);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dial_code.includes(searchQuery) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Select
          value={selectedCountry}
          onValueChange={setSelectedCountry}
        >
          <SelectTrigger id="country" className="w-full">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <div className="sticky top-0 p-2 bg-background border-b">
              <Input
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            {filteredCountries.map((country) => (
              <SelectItem
                key={country.code}
                value={country.code}
                className="cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="text-gray-500">+{country.dial_code}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Enter phone number. 880XX"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-whatsapp hover:bg-whatsapp-hover"
        disabled={isLoading}
      >
        {isLoading ? "Opening WhatsApp..." : "Send Message"}
      </Button>
    </form>
  );
};