import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white dark:bg-[#07071a]">
      <h1 className="text-6xl font-black gradient-text">404</h1>
      <p className="text-slate-500 dark:text-slate-400">Página não encontrada.</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
