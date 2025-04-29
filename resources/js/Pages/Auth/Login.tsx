import { Mail, Lock } from "lucide-react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import { Head, Link, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <section className="w-full h-screen relative bg-gradient-to-r from-[#ff6c00] to-[#ffba00] flex items-center justify-center">
                <div className="bg-white m-10 shadow-2xl rounded-xl overflow-hidden flex w-full max-w-5xl h-[60%] md:h-[70%] p-5 md:p-10">
                    <div className="w-1/2 relative hidden md:block">
                        <img
                            src="https://png.pngtree.com/thumb_back/fh260/background/20211115/pngtree-plain-abstract-blue-background-hd-with-wave-image_916069.png"
                            className="absolute w-full h-full object-cover rounded-xl z-0"
                            alt="Background"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 z-0 rounded-xl"></div>

                        <div className="relative z-10 w-full h-full">
                            <div className="w-full h-full p-10 flex flex-col justify-between">
                                <div className="flex items-center space-x-2 z-10">
                                    <img
                                        src="/image/Logo.png"
                                        className="w-12"
                                        alt="Logo"
                                    />
                                    <h1 className="uppercase text-xl font-semibold text-white">
                                        Lazer Shope
                                    </h1>
                                </div>
                                <div className="w-full flex justify-center z-10">
                                    <h1 className="uppercase text-xl font-semibold text-white text-center">
                                        Welcome to Lazer Shope
                                    </h1>
                                </div>
                                <div className="w-full flex justify-end"></div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 md:p-10 flex justify-center items-center">
                        <div className="w-full max-w-sm">
                            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                                Login
                            </h2>

                            {status && (
                                <div className="mb-6 text-sm font-medium text-green-600 text-center">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-8">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <Mail className="w-5 h-5" />
                                    </span>
                                    <TextInput
                                        id="login"
                                        type="text"
                                        placeholder="Email or Username"
                                        value={data.login}
                                        className="pl-10 w-full border-0 border-b border-gray-300 focus:border-[#ff6c00] focus:ring-0 focus:outline-none"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("login", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.login}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                        <Lock className="w-5 h-5" />
                                    </span>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        value={data.password}
                                        className="pl-10 w-full border-0 border-b border-gray-300 focus:border-[#ff6c00] focus:ring-0 focus:outline-none"
                                        autoComplete="current-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.password}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        className="cursor-pointer"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <label
                                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                                        htmlFor="remember"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                {canResetPassword && (
                                    <div className="text-right">
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm text-gray-600 underline hover:text-gray-900"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
                                )}

                                <div>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-gradient-to-r from-[#ff6c00] to-[#ffba00] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition duration-300 disabled:opacity-50"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
