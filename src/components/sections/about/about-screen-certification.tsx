import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { CheckCircle } from "lucide-react";

export default function AboutScreenCertification() {
    const certifications = [
        "Certified Window Treatment Professional (CWTP)",
        "Window Covering Manufacturers Association (WCMA)",
        "Sustainable Furnishings Council Member",
        "Energy Star Partner",
        "Smart Home Automation Certified",
    ];

    return (
        <section className="py-16 bg-white dark:bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-primary dark:text-foreground mb-6">
                            Гэрчилгээ ба Түншлэл
                        </h2>
                        <p className="text-muted-foreground dark:text-muted-foreground mb-6">
                            Бидний тогтвортой байдалд чиглэсэн амлалт нь салбарт хүлээн зөвшөөрөгдсөн гэрчилгээ
                            болон тэргүүлэгч үйлдвэрлэгчидтэй хамтын ажиллагаагаар баталгааждаг.
                        </p>

                        <Card>
                            <CardContent className="pt-6">
                                <Collapsible className="w-full">
                                    <CollapsibleTrigger asChild>
                                        <Button variant="outline" className="flex w-full justify-between mb-4">
                                            <span>Манай Гэрчилгээг Харах</span>
                                            <span>+</span>
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <ul className="space-y-4 p-4 bg-muted/30 rounded-md">
                                            {certifications.map((cert, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    className="flex items-center"
                                                >
                                                    <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0" />
                                                    <span className="text-primary dark:text-foreground">{cert}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </CollapsibleContent>
                                </Collapsible>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-muted dark:bg-muted rounded-lg p-6 flex items-center justify-center h-36">
                                <img
                                    src={`/api/placeholder/150/80`}
                                    alt={`Гэрчилгээний Лого ${item}`}
                                    className="max-w-full max-h-full"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}