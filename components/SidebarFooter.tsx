const SidebarFooter = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <div className="flex flex-wrap gap-2 mt-5">
        <p className="text-gray-400 text-sm hover:underline cursor-pointer">
          Footer tags
        </p>
        <p className="text-gray-400 mt-5 text-sm">
          Copyright © 2023 Petstagram Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SidebarFooter;
