import { Button } from "@/components/ui/button";

export default function ContactEmergencyServiceSection() {
    return (
        <section className="py-12 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Яаралтай Тусламж Хэрэгтэй Юу?
                    </h2>
                    <p className="text-lg mb-6 text-primary-foreground/90">
                        Яаралтай засвар эсвэл ажлын цагаас гадуурх яаралтай асуултын хувьд
                        манай 24/7 харилцагчийн тусламжийн утас руу залгана уу.
                    </p>
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                        (555) 456-7890
                    </Button>
                </div>
            </div>
        </section>
    );
}