const Footer = () => {
  return (
    <footer className="bg-wine text-bone/70 py-16">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 pb-10 border-b border-bone/15">
          <div>
            <span className="font-serif text-xl text-bone tracking-tight">
              Forno <span className="text-accent-red">&</span> Mesa
            </span>
            <p className="text-sm mt-3 text-bone/50">
              Pão de queijo mineiro. Padrão de indústria.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a href="#marca" className="eyebrow text-bone/50 hover:text-bone transition-colors duration-500">Marca</a>
            <a href="#produto" className="eyebrow text-bone/50 hover:text-bone transition-colors duration-500">Produto</a>
            <a href="#operacao" className="eyebrow text-bone/50 hover:text-bone transition-colors duration-500">Operação</a>
            <a href="#contato" className="eyebrow text-bone/50 hover:text-bone transition-colors duration-500">Contato</a>
          </div>

          <div className="flex flex-col gap-3 text-sm text-bone/50">
            <span>Contagem, MG — Brasil</span>
            <span>CNPJ 00.000.000/0001-00</span>
            <div className="flex gap-4 mt-1">
              <a href="#" className="eyebrow hover:text-bone transition-colors duration-500">LinkedIn</a>
              <a href="#" className="eyebrow hover:text-bone transition-colors duration-500">Instagram</a>
            </div>
          </div>
        </div>

        <p className="text-xs text-bone/30 pt-6">
          © 2026 Forno & Mesa. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
