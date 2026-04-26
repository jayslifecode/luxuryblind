"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/lib/context/language-context";
import { calcSqm, calcPrice, formatPrice } from "@/lib/utils/price";
import { Eyebrow } from "@/components/ui/eyebrow";
import products from "@/data/product.json";

interface BulkRow {
  id: number;
  roomName: string;
  productId: string;
  widthCm: number;
  heightCm: number;
}

interface VisitForm {
  company: string;
  name: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
}

let rowCounter = 1;

const perks = [
  { label: "Тусгай үнэ", desc: "5м²-аас дээш захиалгад хөнгөлөлт" },
  { label: "Мэргэжилтний хэмжилт", desc: "Дагалдах хэмжилтийн үйлчилгээ" },
  { label: "Нэн даруй хүргэлт", desc: "Корпорацийн захиалгад тэргүүлэх дараалал" },
];

export default function PartnersView() {
  const { t } = useLanguage();

  const [rows, setRows] = useState<BulkRow[]>([
    { id: rowCounter++, roomName: "", productId: products[0].id, widthCm: 120, heightCm: 150 },
  ]);

  const [visitForm, setVisitForm] = useState<VisitForm>({
    company: "",
    name: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
  });

  const [bulkSubmitted, setBulkSubmitted] = useState(false);
  const [visitSubmitted, setVisitSubmitted] = useState(false);

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { id: rowCounter++, roomName: "", productId: products[0].id, widthCm: 120, heightCm: 150 },
    ]);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRow = (id: number, field: keyof BulkRow, value: string | number) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  };

  const totalSqm = rows.reduce((acc, row) => {
    const product = products.find((p) => p.id === row.productId);
    if (!product) return acc;
    return acc + calcSqm(row.widthCm, row.heightCm);
  }, 0);

  const totalPrice = rows.reduce((acc, row) => {
    const product = products.find((p) => p.id === row.productId);
    if (!product) return acc;
    return acc + calcPrice(row.widthCm, row.heightCm, product.pricePerSqm);
  }, 0);

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBulkSubmitted(true);
  };

  const handleVisitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisitForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVisitSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-lb-bg">
      {/* Hero */}
      <section className="py-28 sm:py-36 border-b border-lb-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-5"
          >
            <Eyebrow>{t.partners.eyebrow}</Eyebrow>
            <h1 className="font-display text-5xl sm:text-6xl font-light text-lb-ivory leading-tight">
              {t.partners.heading}
            </h1>
            <p className="font-sans text-sm text-lb-ash leading-relaxed max-w-xl">
              Байгууллага, зочид буудал, оффис, орон сууцны цогцолборт зориулсан томоохон захиалгын тусгай нөхцөл.
            </p>
          </motion.div>

          {/* Perks */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-px bg-lb-border">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="bg-lb-surface px-6 py-5 space-y-1"
              >
                <p className="font-sans text-sm text-lb-ivory">{perk.label}</p>
                <p className="font-sans text-xs text-lb-ash leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Track A: Bulk Order */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-1 pb-6 border-b border-lb-border">
                <Eyebrow className="mb-2">Захиалга өгөх</Eyebrow>
                <h2 className="font-display text-2xl font-light text-lb-ivory">{t.partners.bulkTitle}</h2>
                <p className="font-sans text-xs text-lb-ash leading-relaxed">{t.partners.bulkDesc}</p>
              </div>

              {bulkSubmitted ? (
                <div className="bg-lb-surface border border-lb-border rounded-sm p-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full border border-lb-gold flex items-center justify-center mx-auto">
                    <span className="text-lb-gold text-xl">✓</span>
                  </div>
                  <p className="font-display text-xl font-light text-lb-ivory">Хүсэлт илгээгдлээ</p>
                  <p className="font-sans text-sm text-lb-ash">Бид удахгүй холбогдох болно</p>
                </div>
              ) : (
                <form onSubmit={handleBulkSubmit} className="space-y-4">
                  <div className="bg-lb-surface border border-lb-border rounded-sm overflow-hidden">
                    {/* Table header */}
                    <div className="grid grid-cols-[1fr_1fr_72px_72px_40px] gap-2 px-4 py-3 border-b border-lb-border bg-lb-card">
                      <span className="font-sans text-[9px] text-lb-ash tracking-widest uppercase">{t.partners.roomName}</span>
                      <span className="font-sans text-[9px] text-lb-ash tracking-widest uppercase">{t.partners.productType}</span>
                      <span className="font-sans text-[9px] text-lb-ash tracking-widest uppercase text-right">Өргөн</span>
                      <span className="font-sans text-[9px] text-lb-ash tracking-widest uppercase text-right">Өндөр</span>
                      <span></span>
                    </div>

                    {/* Table rows */}
                    <div className="divide-y divide-lb-border">
                      {rows.map((row) => (
                        <div key={row.id} className="grid grid-cols-[1fr_1fr_72px_72px_40px] gap-2 px-4 py-2.5 items-center">
                          <input
                            type="text"
                            value={row.roomName}
                            onChange={(e) => updateRow(row.id, "roomName", e.target.value)}
                            placeholder="Өрөө 1"
                            className="bg-lb-card border border-lb-border rounded px-2 py-1.5 font-sans text-xs text-lb-ivory placeholder:text-lb-ash/40 focus:outline-none focus:border-lb-gold transition-colors"
                          />
                          <select
                            value={row.productId}
                            onChange={(e) => updateRow(row.id, "productId", e.target.value)}
                            className="bg-lb-card border border-lb-border rounded px-2 py-1.5 font-sans text-xs text-lb-ivory focus:outline-none focus:border-lb-gold transition-colors"
                          >
                            {products.map((p) => (
                              <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                          </select>
                          <input
                            type="number"
                            min={30}
                            max={400}
                            value={row.widthCm}
                            onChange={(e) => updateRow(row.id, "widthCm", Math.max(30, Number(e.target.value)))}
                            className="bg-lb-card border border-lb-border rounded px-2 py-1.5 font-numbers text-xs text-lb-ivory focus:outline-none focus:border-lb-gold transition-colors text-right"
                          />
                          <input
                            type="number"
                            min={30}
                            max={400}
                            value={row.heightCm}
                            onChange={(e) => updateRow(row.id, "heightCm", Math.max(30, Number(e.target.value)))}
                            className="bg-lb-card border border-lb-border rounded px-2 py-1.5 font-numbers text-xs text-lb-ivory focus:outline-none focus:border-lb-gold transition-colors text-right"
                          />
                          <button
                            type="button"
                            onClick={() => removeRow(row.id)}
                            disabled={rows.length === 1}
                            className="font-sans text-xs text-lb-ash hover:text-red-400 transition-colors disabled:opacity-20 flex items-center justify-center min-h-[36px]"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Footer totals */}
                    <div className="px-4 py-3 border-t border-lb-border bg-lb-card flex justify-between items-center gap-4">
                      <button
                        type="button"
                        onClick={addRow}
                        className="font-sans text-xs text-lb-gold hover:text-lb-gold-lt transition-colors"
                      >
                        + {t.partners.addRow}
                      </button>
                      <div className="flex gap-6 text-right">
                        <div>
                          <p className="font-sans text-[9px] text-lb-ash tracking-widest uppercase mb-0.5">{t.partners.totalSqm}</p>
                          <p className="font-numbers text-sm text-lb-ivory">{totalSqm} м²</p>
                        </div>
                        <div>
                          <p className="font-sans text-[9px] text-lb-ash tracking-widest uppercase mb-0.5">{t.partners.estimatedPrice}</p>
                          <p className="font-numbers text-sm text-lb-gold">{formatPrice(totalPrice)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-lb-gold text-lb-bg font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-lb-gold-lt transition-colors min-h-[52px]"
                  >
                    {t.partners.quoteRequest}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Track B: Site Visit */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="space-y-1 pb-6 border-b border-lb-border">
                <Eyebrow className="mb-2">Газар дээр үзлэг</Eyebrow>
                <h2 className="font-display text-2xl font-light text-lb-ivory">{t.partners.visitTitle}</h2>
                <p className="font-sans text-xs text-lb-ash leading-relaxed">{t.partners.visitDesc}</p>
              </div>

              {visitSubmitted ? (
                <div className="bg-lb-surface border border-lb-border rounded-sm p-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full border border-lb-gold flex items-center justify-center mx-auto">
                    <span className="text-lb-gold text-xl">✓</span>
                  </div>
                  <p className="font-display text-xl font-light text-lb-ivory">Захиалга хүлээн авлаа</p>
                  <p className="font-sans text-sm text-lb-ash">Манай мэргэжилтэн тантай холбогдох болно</p>
                </div>
              ) : (
                <form onSubmit={handleVisitSubmit} className="space-y-4">
                  {[
                    { name: "company", label: t.partners.company, type: "text" },
                    { name: "name", label: "Нэр", type: "text" },
                    { name: "phone", label: "Утасны дугаар", type: "tel" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="font-sans text-[10px] text-lb-ash tracking-widest uppercase font-medium">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        required
                        value={visitForm[field.name as keyof VisitForm]}
                        onChange={handleVisitChange}
                        className="w-full bg-lb-surface border border-lb-border rounded-sm px-4 py-3.5 font-sans text-sm text-lb-ivory placeholder:text-lb-ash/40 focus:outline-none focus:border-lb-gold transition-colors"
                      />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-sans text-[10px] text-lb-ash tracking-widest uppercase font-medium">{t.partners.preferredDate}</label>
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        value={visitForm.preferredDate}
                        onChange={handleVisitChange}
                        className="w-full bg-lb-surface border border-lb-border rounded-sm px-4 py-3.5 font-sans text-sm text-lb-ivory focus:outline-none focus:border-lb-gold transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-sans text-[10px] text-lb-ash tracking-widest uppercase font-medium">{t.partners.preferredTime}</label>
                      <input
                        type="time"
                        name="preferredTime"
                        required
                        value={visitForm.preferredTime}
                        onChange={handleVisitChange}
                        className="w-full bg-lb-surface border border-lb-border rounded-sm px-4 py-3.5 font-sans text-sm text-lb-ivory focus:outline-none focus:border-lb-gold transition-colors"
                      />
                    </div>
                  </div>

                  <div className="bg-lb-surface border border-lb-border rounded-sm p-5 space-y-3">
                    <p className="font-sans text-[10px] text-lb-ash tracking-widest uppercase">Үйлчилгээнд орно</p>
                    <ul className="space-y-2">
                      {["Цонхны хэмжилт хийнэ", "Материал, загварын зөвлөгөө", "Үнийн санал гарна"].map((item) => (
                        <li key={item} className="flex items-center gap-3 font-sans text-xs text-lb-ash">
                          <span className="w-1 h-1 rounded-full bg-lb-gold shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 border border-lb-gold text-lb-gold font-sans text-xs font-semibold tracking-widest uppercase rounded hover:bg-lb-gold hover:text-lb-bg transition-colors min-h-[52px]"
                  >
                    {t.partners.submit}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
