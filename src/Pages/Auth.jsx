import { CgHello } from 'react-icons/cg';
import { Link } from 'react-router';
import { useAuth } from '../lib/Hooks/useAuth';
import { useEffect, useRef } from 'react';

const LoginPage = () => {
  const {
    phone,
    otp,
    isSendOtp,
    isExpired,
    getFormatedTime,
    resendOtp,
    handlePhoneChange,
    handleOtpChange,
    handleSubmit,
  } = useAuth();

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isSendOtp]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-5 rounded-2xl sm:w-[426px]">
      <header className="text-center flex items-center justify-center flex-col gap-2">
        <h1 className="font-bold text-zinc-800 dark:text-zinc-100 text-xl flex items-center gap-2">
          خوش برگشتید <CgHello />
        </h1>

        <div className="flex font-medium items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
          <span>ثبت‌نام یا ورود</span>
        </div>
      </header>

      <main className="space-y-3">
        {isSendOtp ? (
          <>
            <div className="flex items-center justify-center gap-1">
              <input
                ref={inputRef}
                className="auth-input text-center"
                type="text"
                dir="ltr"
                placeholder="کد تایید"
                value={otp}
                onChange={handleOtpChange}
              />
            </div>

            <div className="mt-3 text-center">
              {isExpired ? (
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-sm text-purple-500 hover:underline"
                >
                  ارسال مجدد کد
                </button>
              ) : (
                <p className="text-xs">
                  اعتبار کد تا <span className="font-medium">{getFormatedTime()}</span>
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-xs font-normal">لطفا شماره موبایل خود را وارد کنید</p>

            <input
              ref={inputRef}
              className="auth-input"
              type="text"
              dir="ltr"
              placeholder="09123456789"
              value={phone}
              onChange={handlePhoneChange}
            />
          </>
        )}
      </main>

      <footer className="space-y-3 flex items-center justify-center flex-col">
        <button
          className={`h-10 text-sm flex items-center w-full duration-150 cursor-pointer justify-center bg-purple-600 hover:bg-purple-700 text-white rounded-lg focus-within:ring-4 ring-purple-500/30 active:scale-100! hover:scale-103 hover:shadow-lg shadow-purple-500/20
            ${isSendOtp && isExpired && 'opacity-50'}
          `}
          disabled={isSendOtp && isExpired}
        >
          {isSendOtp ? ' ثبت کد' : 'ارسال کد'}
        </button>

        <div className="space-y-1 text-center mt-4">
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
            شما با ثبت نام قوانین وبسایت را قبول می‌کنید.
          </p>

          <Link
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 duration-150 text-center mx-auto max-w-max! text-xs"
            to={'/'}
          >
            بازگشت
          </Link>
        </div>
      </footer>
    </form>
  );
};

export default LoginPage;
