import { Link, useLoaderData } from "@remix-run/react";
import { ArrowUpRight, SendHorizontal } from "lucide-react";
import { motion, useScroll } from "framer-motion";
import { FaGithub } from "react-icons/fa6";
import type { MetaFunction } from "@remix-run/node";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import type { Project } from "~/types";
import { skillIcons } from "~/consts";
import { getProjects, getSkills } from "~/models";
import ScrollIndicator from "~/components/ScrollIndicator";
import { DecoderText } from "~/components/decoder-text";
import ShapeMorph from "~/components/ShapeMorph.client";
import { ClientOnly } from "~/components/client-only";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Typewriter from "~/components/fancy/typewriter";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6 }
  })
};

const TimelineItem = ({ title, description, isLeft, index }: { title: string; description: string; isLeft: boolean; index: number }) => {
  return (
    <motion.div
      className={`flex ${isLeft ? 'flex-row-reverse md:contents' : 'md:contents'}`}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      {isLeft && (
        <div className="bg-[hsl(var(--timeline-cards))] col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md"> 
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="leading-tight text-justify">{description}</p>
        </div>
      )}
      <motion.div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
        <div className="h-full w-6 flex items-center justify-center">
          <div className="h-full w-1 bg-[hsl(var(--timeline-line))] pointer-events-none"></div> 
        </div>
        <motion.div
          className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[hsl(var(--timelinedots))] shadow"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.3, duration: 0.4 }}
        ></motion.div>
      </motion.div>
      {!isLeft && (
        <div className="bg-[hsl(var(--timeline-cards))] col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md"> 
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="leading-tight text-justify">{description}</p>
        </div>
      )}
    </motion.div>
  );
};

const TimelineDot = ({ index }: { index: number }) => (
  <motion.div
    className="col-start-5 col-end-6 md:mx-auto relative mr-10"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: index * 0.3, duration: 0.4 }}
  >
    <div className="w-6 h-6 rounded-full bg-[hsl(var(--timelinedots))] shadow mx-auto"></div>
  </motion.div>
);

export const meta: MetaFunction = () => {
  return [
    { title: "Beatriz Akemi" },
    {
      name: "Portfolio contendo informacoes e projetos pessoais de Beatriz Akemi",
      content: "Portfolio",
    },
  ];
};

export async function loader() {
  const [projects, skills] = await Promise.all([getProjects(), getSkills()]);

  return {
    projects,
    skills,
  };
}

export default function Main() {
  const { projects, skills } = useLoaderData<typeof loader>();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { scrollYProgress } = useScroll();
  const defaultAnimation = (duration: number) => {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration },
    };
  };

  const textAnimation = defaultAnimation(2);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      <motion.div
        className="progress-bar z-10"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          <section
            id="home"
            className="w-full h-screen py-12 md:py-24 lg:py-32"
          >
            <div className="container flex">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 w-full">
                <div className="flex flex-col justify-center items-center space-y-4">
                  <motion.div {...textAnimation} className="space-y-2 ">
                    <h1 className="self-start text-2xl text-muted-foreground tracking-widest uppercase">
                      <DecoderText text={"Beatriz Akemi"} delay={500} />
                    </h1>
                    <div className="whitespace-pre-wrap text-2xl text-secondary-foreground font-semibold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      <span>{"Software Engineer and "}</span>
                      <Typewriter
                        text={["Back-End", "Front-End", "UX Design", "Engenharia de Software"]}
                        speed={70}
                        className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-gray/90 to-rose-300"
                        waitTime={1500}
                        deleteSpeed={40}
                        cursorChar={"_"}
                      />
                    </div>
                  </motion.div>
                </div>

                <div className="h-[600px]">
                  <ClientOnly>{() => <ShapeMorph />}</ClientOnly>
                </div>
              </div>

              <ScrollIndicator />
            </div>
          </section>

          <section id="about">
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
              className="container mx-auto px-4 py-12"
            >
              <h1 className="text-2xl text-foreground tracking-widest uppercase font-semibold">
                <DecoderText text={"Olá"} delay={500} />
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex items-center justify-between flex-col sm:flex-row"
              >
                <div className="max-w-lg text-muted-foreground">
                  <div className="gap-4 flex flex-col tracking-wide">
                    <p>
                      Meu nome é Beatriz, atualmente moro no Brasil. Estou no penúltimo periodo
                      em Engenharia de Software, atualmente trabalho como
                      Analista de desenvolvimento Junior e quero  poder me concentrar mais em oportunidades de trabalho front end. Buscando
                      sempre desenvolver telas robustas e responsivas. Voce pode
                      conferir meu{" "}
                      <Link to={"/curriculum"}>
                        <span className="relative cursor-pointer group text-[#A4BDD5]">
                          curriculo aqui
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-custonText transition-all duration-300 ease-in-out group-hover:w-full" />
                        </span>
                      </Link>
                      .
                    </p>
                    <p>
                      Gosto de pensar criativamente, desenvolver e desenhar designs
                      trabahar com projetos é algo que gosto muito. Se você
                      tiver interesse nas ferramentas e softwares que utilizo e tenho familiaridade,
                      olhe minha{" "}
                      <Link to={"/uses"}>
                        <span className="relative cursor-pointer group text-[#A4BDD5]">
                          página de uso
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-custonText transition-all duration-300 ease-in-out group-hover:w-full" />
                        </span>
                      </Link>
                      .
                    </p>
                    <p>
                      Nas horas vagas gosto de jogar, ouvir musica
                      e colecionar cards. Estou sempre
                      interessado em ouvir sobre novos projetos entao fique à
                      vontade para me enviar uma mensagem e entrar em contato.
                    </p>
                    <Link to={"/contact"}>
                      <button
                        type="button"
                        className="font-semibold relative overflow-hidden bg-transparent text-purple-300 px-4 py-1 transition duration-300 group"
                      >
                        <span className="absolute inset-0 bg-custonText transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left" />
                        <span className="flex flex-row relative gap-2 items-center z-10 text-foreground   ">
                          <SendHorizontal />
                          Envie uma mensagem
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="relative p-10 sm:p-0">
                  <p className="absolute rotate-90 top-10 -right-48 font-bold text-4xl sm:-right-36 sm:text-9xl text-[#A4BDD5]">
                      私は
                  </p>

                  <motion.img
                    className="w-[550px] h-[550px] aspect-square rounded-lg"
                    src="https://i.pinimg.com/736x/87/63/36/87633699bb10003f380a0b393dff4192.jpg"
                    alt="Beatriz profile"
                  />
                </div>
              </motion.div>

              <div className="container mx-auto py-12 md:py-16 lg:py-20">
                <div className="space-y-6 md:space-y-8 lg:space-y-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Carousel
                        plugins={[
                          Autoplay({
                            delay: 1500,
                          }),
                        ]}
                        className="w-full"
                      >
                        <CarouselContent className="-ml-4">
                          {skills.map((s, index) => (
                            <CarouselItem
                              key={index}
                              className="pl-1 basis-1/6 md:basis-1/2 lg:basis-1/12"
                            >
                              <div className="p-1">
                                <span className="text-2xl font-semibold">
                                  {skillIcons[
                                    s.title as keyof typeof skillIcons
                                  ]?.()}
                                </span>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                      </Carousel>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>
              <section id="timeline">
                <div className="container mx-auto px-4 py-12">
                  <h1 className="text-2xl text-foreground tracking-widest uppercase font-semibold">
                    <DecoderText text={"Experiencia Profissional e Academica"} delay={500} />
                  </h1>
                  <div className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50">
                    <TimelineDot index={0} />
                    <TimelineItem title="2021 - 2025" description="Iniciei a graduação de Engenharia de Software" isLeft={true} index={1} />
                    <TimelineItem title="12/2023 - 06/2024" description="Estagiei como Desenvolvedora fullstack na Vital Scheffer" isLeft={false} index={2} />
                    <TimelineItem title="06/2024 - 12/2024" description="Iniciei meu estagio na Pilgrims Consulting como Desenvolvedora de software" isLeft={true} index={3} />
                    <TimelineItem title="12/2024 - Presente" description="Fui Efetivada como Analista de Desenvolvimento Junior" isLeft={false} index={4} />
                    <TimelineItem title="01/2025" description="Recebi minha certificação internacional JLPT N4" isLeft={true} index={4} />
                    <TimelineItem title="01/2025" description="Recebi minha certificação da fundação bradesco de fundamentos do design grafico" isLeft={false} index={4} />
                    <TimelineItem title="12/2025" description="Fim previsto para minha graduação como Engenheira de Software" isLeft={true} index={5} />
                    <TimelineDot index={6} />
                  </div>
                </div>
              </section>
        </main>
      </div>
    </div>
  );
}
