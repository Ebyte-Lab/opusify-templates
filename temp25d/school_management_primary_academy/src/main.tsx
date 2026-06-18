import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { ChildProvider } from './app/providers/ChildProvider';
import { MessagesProvider } from './app/providers/MessagesProvider';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChildProvider>
      <MessagesProvider>
        <RouterProvider router={router} />
      </MessagesProvider>
    </ChildProvider>
  </React.StrictMode>
);
