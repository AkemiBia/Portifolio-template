import { Link } from "@remix-run/react";
import { ChevronRight } from "lucide-react";
import { DecoderText } from "~/components/decoder-text";
import { motion } from "framer-motion";

const tools = [
  {
    lang: "Figma",
    desc: "Para o Design eu uso o Figma, é minha principal ferramenta para design de UI atualmente.",
    link: "https://www.figma.com/pt-br/",
  },
  {
    lang: "Visual Studio Code",
    desc: "Meu principal editor de texto",
    link: "https://code.visualstudio.com/",
  },
  {
    lang: "React",
    desc: "Tenho preferencia em utilizar React devido a minha familiaridade com ele.",
    link: "https://react.dev/",
  },
  {
    lang: "Three.JS",
    desc: "Estive estudando recentemente e gosto muito do visual unico que ela traz para os projetos.",
    link: "https://threejs.org/",
  },
  {
    lang: "TailwindCSS",
    desc: "Adquiri experiencia com o tailwind trabalhando em alguns projetos internos de duas empresas na qual trabalhei e gosto do seu funcionamento",
    link: "https://tailwindcss.com/",
  },
  {
    lang: "Framer Motion",
    desc: "Para as animações no JavaScript eu utilizo o Framer Motion,devido a praticidade de adicionar animações aos projetos",
    link: "https://motion.dev/",
  },
  {
    lang: "ShadCN",
    desc: "Alguns componentes e temas utilizados neste projeto o ShadCN, são componentes projetados para copiar e colar em seus aplicativos, com TailwindCSS.",
    link: "https://ui.shadcn.com/",
  },
  {
    lang: "Daisy",
    desc: "Gosto de utilizar alguns componentes vindo da biblioteca DaisyUI durante minhas tarefas de rotina também.",
    link: "https://daisyui.com",
  },
];

const tools2 = [
  {
    lang: "Python",
    desc: "Trabalhei com muitas automações usando python além desenvolvimento de ferramentas internas, bots, scripts.",
    link: "https://www.python.org",
  },
  {
    lang: "Apache Airflow",
    desc: "Utilizei diariamente o airflow para execução de dags com tarefas recorrentes dentro do ciclo de vida da empresa.",
    link: "https://airflow.apache.org",
  },
  {
    lang: "GLPI",
    desc: "Para gestão de projetos, aplicação de metodologias ageis dentro da equipe e gestão de chamados fiz uso do GLPI dentro do ambiente corporativo.",
    link: "https://glpi-project.org/pt-br/",
  },
  {
    lang: "Angular",
    desc: "Atuei na manutenção e desenvolvimento de funcionalidades dentro de um ambiente em angular para gestão do negocio.",
    link: "https://angular.dev",
  },
  {
    lang: "Meta",
    desc: "Para BI gosto de utilizar a ferramenta open source metabase que permite a criação e gestão de dashboards e relatorios de maneira muito simples e pratica.",
    link: "https://www.metabase.com",
  },
  {
    lang: "R",
    desc: "Gosto de utilizar R e Rstudio para tarefas envolvendo grandes volumes de dados.",
    link: "https://www.r-project.org",
  },
  {
    lang: "Banco de dados",
    desc: "Tenho experiencia com bancos distribuidos mas tenho preferencia por oracleSQL e Postgres SQL",
    link: "https://www.oracle.com/br/database/sqldeveloper/",
  },
];

const system = [
  {
    title: "Desktop",
    desc: " i5-8500 // RTX3060 - OC",
  },
  {
    title: "Sistema operacional",
    desc: "Windows / Debian",
  },
  {
    title: "Monitor",
    desc: "LG 23MP55HQ // Dell P2219H",
  },
  {
    title: "Mouse",
    desc: "Logitech 203",
  },
  {
    title: "Teclado",
    desc: "Custom Mitra White",
  },
  {
    title: "Headset",
    desc: "Samsung buds FE",
  },
];

export default function Uses() {
  const [designTool] = tools;
  const [backTool] = tools2;
  const devTools = tools.slice(1);

  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <img
          className="fixed top-0 left-0 w-full h-full object-cover opacity-30"
          src="/assets/rei-ayanami-rei.gif"
          width="550"
          height="550"
          alt="raiden mei"
        />
      </div>
      <motion.div
        className="flex flex-col gap-6 mb-10 container "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="my-6">
          <h1 className="text-3xl text-foreground font-semibold">
            <DecoderText text={"Página de Uso"} delay={500} />
          </h1>
          <p className="text-muted-foreground mt-4">
            Uma lista um tanto abrangente de ferramentas, aplicativos, hardware
            e muito mais que uso diariamente para projetar e codificar coisas.
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Design</h1>
          <p className="flex text-muted-foreground mt-4 flex-wrap">
            <ChevronRight className="text-custonText" /> Para o Design eu uso o
            <Link to={designTool.link}>
              <span className="relative text-custonText cursor-pointer group mx-1">
                {designTool.lang}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-custonText transition-all duration-300 ease-in-out group-hover:w-full" />
              </span>
            </Link>
            {designTool.desc.replace(
              `Para o Design eu uso o ${designTool.lang},`,
              ""
            )}
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Desenvolvimento</h1>
          {devTools.map((tool, index) => (
            <div key={index} className="my-4">
              <p className="flex items-center text-muted-foreground flex-wrap">
                <ChevronRight className="text-custonText" />
                <Link to={tool.link} className="whitespace-nowrap">
                  <span className="relative text-custonText cursor-pointer group mx-1">
                    {tool.lang}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-custonText transition-all duration-300 ease-in-out group-hover:w-full" />
                  </span>
                </Link>
                <span className="whitespace-normal">
                  {tool.desc.replace(` ${tool.lang},`, "")}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="my-6">
          <h1 className="text-3xl text-foreground font-semibold">
            <DecoderText text={"Outras Tecnologias"} delay={500} />
          </h1>
          <p className="text-muted-foreground mt-4">
            Durante meu tempo de trabalho como Desenvolvedora utilizei outras ferramentas
            para desenvolvimento de automações, analises de dados e trabalhos em outras areas.
            <br/><br/>
            Abaixo segue uma breve listagem das quais eu tenho mais familiaridade.
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Desenvolvimento</h1>
          {tools2.map((backTool, index) => (
            <div key={index} className="my-4">
              <p className="flex items-center text-muted-foreground flex-wrap">
                <ChevronRight className="text-custonText" />
                <Link to={backTool.link} className="whitespace-nowrap">
                  <span className="relative text-custonText cursor-pointer group mx-1">
                    {backTool.lang}
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-custonText transition-all duration-300 ease-in-out group-hover:w-full" />
                  </span>
                </Link>
                <span className="whitespace-normal">
                  {backTool.desc.replace(` ${backTool.lang},`, "")}
                </span>
              </p>
            </div>
          ))}
        </div>

        <h1 className="text-2xl font-semibold ">Sistema</h1>
        {system.map((item, index) => (
          <div key={index} className="flex-row flex justify-between border-b">
            <h1 className="font-semibold text-muted-foreground">
              {item.title}
            </h1>
            <span className="text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
