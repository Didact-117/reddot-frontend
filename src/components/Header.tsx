const Header = ({ title }: { title: string }) => {
    return (
      <div className="flex flex-col justify-center items-start w-full py-2 gap-2">
        <h1 className="text-2xl font-bold tracking-wide text-[#222222]">{title}</h1>
        <div className="w-full border-b-4 border-[#D90824]"></div>
      </div>
    );
  };
  
  export default Header;