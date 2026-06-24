function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9FA1FF]">
      <div className="bg-[#B5BAFF] p-8 rounded-2xl text-white shadow-2xl  border-2 border-white">
        <h1>Welcome Back</h1>
        <p>Sign in to your account</p>
        <br />
        <input type="email" id="email" placeholder="Email Address" />
        <br />
        <input type="password" id="password" placeholder="Password" />
        <br />
        <label>
          <input type="checkbox" id="remember" />
          Remember me
        </label>
        <a className="text-blue-500" href="https://www.w3schools.com/">
          Forgot password?
        </a>
        <button className="bg-blue-500 text-white p-4 rounded">Sign In</button>
        <div className="relative flex items-center my-6">
          <div className="flex-grow border-t-2 border-white/30"></div>
          <span className="flex-shrink mx-4 text-white/80 text-sm font-medium">
            or continue with
          </span>
          <div className="flex-grow border-t-2 border-white/30"></div>
        </div>
        <div className="flex items-center justify-center gap-20">
          <button>Google</button>
          <button>GitHub</button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-white/80">Don't have an account?</p>
          <a className="text-blue-500" href="https://www.w3schools.com/">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
