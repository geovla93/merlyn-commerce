import { Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import toast, { resolveValue, Toaster, ToastIcon } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster position="top-right">
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className="flex items-center rounded bg-white p-4 shadow-lg"
          enter="transition-all duration-300 transform"
          enterFrom="scale-75 opacity-0"
          enterTo="scale-100 opacity-100"
          leave="transition-all duration-300 transform"
          leaveFrom="scale-100 opacity-100"
          leaveTo="scale-90 opacity-0"
        >
          <ToastIcon toast={t} />
          <p className="cursor-default px-2 text-lg font-medium">
            {resolveValue(t.message, t)}
          </p>
          <XIcon
            onClick={() => toast.dismiss(t.id)}
            className="h-5 w-5 cursor-pointer text-indigo-600"
          />
        </Transition>
      )}
    </Toaster>
  );
};

export default Toast;
