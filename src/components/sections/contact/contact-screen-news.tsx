import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactNewsletterSection() {
    return (
        <section className="py-16 bg-white dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-primary dark:text-foreground mb-4">
                        Мэдээллээ шинэчилнэ үү
                    </h2>
                    <p className="text-muted-foreground mb-8">
                        Манай цэсэнд бүртгүүлснээр хамгийн сүүлийн үеийн бүтээгдэхүүний шинэчлэлт, дизайны зөвлөмжүүд,
                        болон тусгай саналуудаас хамгийн түрүүнд мэдэх боломжтой.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                        <Input
                            type="email"
                            placeholder="Имэйл хаягаа оруулна уу"
                            className="flex-1"
                            required
                        />
                        <Button type="submit">
                            Бүртгүүлэх
                        </Button>
                    </form>
                    <p className="text-xs text-muted-foreground mt-4">
                        Бид таны нууцлалыг хүндэтгэнэ. Хэзээ ч унтрах боломжтой.
                    </p>
                </div>
            </div>
        </section>
    );
}
