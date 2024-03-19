'use client';

import ReactQueryProvider from "@/utils/react-query/client/react-query-provider";

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ReactQueryProvider>
      {children}
    </ReactQueryProvider>
  )
}

export default Providers;