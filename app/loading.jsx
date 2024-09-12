const loading = () => {
  return (
    <div className="h-screen grid place-content-center">
      <div className="h-32 w-32 mb-4 rounded-full border-8 border-primary-one border-t-transparent animate-spin" />
      <p className="text-neutral-dark01 text-center">Loading, please wait</p>
    </div>
  );
};

export default loading;
