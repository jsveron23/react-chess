import {
  DiagramSection,
  LogoSection,
  MenuSection,
  SheetSection,
} from '~/sections';
import { Viewport, Sidebar } from '~/components';
import '~/styles/app.css';

/**
 * TODO
 * 1. Load game
 * 2. Check localstorage for checking save file
 * 3. If not, automatically get started 1 vs 1
 */

function App() {
  return (
    <Viewport>
      <DiagramSection />

      <Sidebar>
        <LogoSection />
        <MenuSection />
        <SheetSection />
      </Sidebar>
    </Viewport>
  );
}

export default App;
