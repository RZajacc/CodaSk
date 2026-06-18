function LoadingScreen() {
  return (
    <div className="flex h-2/3 items-center justify-center">
      <img
        className="loader"
        src={'/Loader.png'}
        alt="logo"
        width={400}
        height={400}
      />
    </div>
  );
}

export default LoadingScreen;
