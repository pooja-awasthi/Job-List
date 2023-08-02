import React from 'react';

export default function Tooltip({ message, addClass, children }) {
    return (
    <div class="group relative flex flex-grow flex-nowrap">
        {children}
        <div
          class={`${addClass} scale-0 transition-all flex items-center rounded bg-gray-200 p-2 text-xs font-semibold text-black group-hover:scale-100 shadow-[0_4px_9px_-4px_#3b71ca] ease-in-out duration-150 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]`}
        >
            {message}</div>
    </div>
    )
  }