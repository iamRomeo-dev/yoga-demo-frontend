import Link from "next/link";

export const Error404Page = () => {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-[#FF751F]">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Page introuvable
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          Désolé, on n&apos;a pas trouvé cette page.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href={`/`}
            className="rounded-md bg-[#FF751F] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#FF751F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF751F]"
          >
            Page d&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
};
