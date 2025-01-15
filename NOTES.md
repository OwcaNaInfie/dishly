## 1. `src/App.tsx`
Plik `src/App.tsx` zazwyczaj pełni rolę **głównego punktu wejścia dla aplikacji React** i odpowiada za:

- **Inicjalizację aplikacji:**
  To tutaj importowane są globalne style, konfiguracje, providery (np. Redux Provider, Router, Context) oraz inne elementy niezbędne do uruchomienia aplikacji.

- **Deklaracja głównego routingu:**
  Jeśli aplikacja korzysta z `react-router`, to w tym pliku definiujemy podstawową strukturę nawigacji, np. które komponenty są renderowane w zależności od ścieżki URL.

- **Struktura globalna aplikacji:**
  Może zawierać komponenty wspólne dla całej aplikacji, takie jak `Header`, `Footer`, czy inne layouty, które nie zmieniają się między podstronami.

**Przykład zawartości `src/App.tsx`:**
```tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './routes/AppRoutes';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
    </Provider>
  );
};

export default App;
