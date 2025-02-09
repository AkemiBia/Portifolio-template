import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { DecoderText } from "~/components/decoder-text";
import MouseMoveEffect from "~/components/mouse-move-effect";
import { Input } from "~/components/ui/input";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceID = "service_bqgwi8e"; // Substitua pelo seu Service ID
    const templateID = "template_l87d08n"; // Substitua pelo seu Template ID
    const publicKey = "oE5E2umg3jqKCkRB6"; // Substitua pelo seu Public Key

    const templateParams = {
      from_email: email,
      message: message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      setStatus("Mensagem enviada com sucesso! ✅");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus("Ocorreu um erro. Tente novamente. ❌");
      console.error("Erro ao enviar e-mail:", error);
    }
  };

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <MouseMoveEffect />

      <div className="relative z-10 h-[84vh] flex items-center justify-center flex-col gap-6 px-4">
        <h1 className="text-4xl text-foreground tracking-wide font-bold text-center">
          <DecoderText text={"Me mande uma mensagem!"} delay={500} />
        </h1>

        <form
          onSubmit={sendEmail}
          className="rounded-lg w-full max-w-md flex flex-col gap-6"
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">
              E-mail:
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              className="p-3 border rounded-md focus:outline-none focus:ring-1 focus:custonText"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold">
              Mensagem:
            </label>
            <Input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Insira sua mensagem."
              className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:custonText"
              required
            />
          </div>

          <button
            type="submit"
            className="font-semibold relative overflow-hidden bg-transparent text-purple-300 px-4 py-1 transition duration-300 group"
          >
            <span className="absolute inset-0 bg-custonText transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left" />
            <span className="flex flex-row relative gap-2 items-center z-10 text-foreground">
              <SendHorizontal /> Enviar mensagem
            </span>
          </button>
        </form>

        {status && <p className="text-center text-sm text-foreground">{status}</p>}
      </div>
    </div>
  );
}
