export const InfoTerm = () => {
  return (
    <div className="max-w-[640px]  flex flex-col text-white max-lg:hidden">
      <div className="flex">
        <p className="text-[#E455AE] text-4xl mx-2">const</p>
        <p className="text-[#37EBF3] text-4xl ">getUser</p>
        <p className="text-white text-4xl mx-2"> {"="} </p>
        <p className="text-[#1AC5B0] text-4xl">{"{"}</p>
      </div>
      <div className="flex flex-col gap-4 ">
        <div className="pl-10">
          <p className="text-4xl">name : jose brusa</p>
          <p className="text-4xl">profecion : frontend</p>
          <p className=" text-4xl">skills: </p>
          <p className="text-[#FDF500] pl-20 text-4xl ">{"["}</p>
        </div>
        <div className="pl-36">
          <p className="text-[#9381FF] text-4xl">javascript,</p>
          <p className="text-[#9381FF]  text-4xl">Reactjs,</p>
          <p className="text-[#9381FF]  text-4xl">React Native</p>
        </div>
        <div className="pl-20">
          <p className="text-[#FDF500] pl-10  text-4xl">{"   ]"}</p>
          <p className="text-[#1AC5B0]  text-4xl">{"}"}</p>
        </div>
      </div>
    </div>
  );
};
