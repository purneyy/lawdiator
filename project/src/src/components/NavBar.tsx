
import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Book, Users, HelpCircle, Phone, LogIn } from 'lucide-react';
import AIChat from './AIChat';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const NavBar = () => {
  return (
    <nav className="bg-legal-primary text-white py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Scale className="h-6 w-6" />
          <Link to="/" className="text-xl font-bold">Legaluna</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu className="text-white">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-legal-light hover:text-white focus:bg-legal-light focus:text-white">Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/chatbot" title="AI Chatbot" icon={<Book className="h-5 w-5" />}>
                      Get legal advice from our AI assistant.
                    </ListItem>
                    <ListItem href="/templates" title="Templates" icon={<Book className="h-5 w-5" />}>
                      Download legal document templates.
                    </ListItem>
                    <ListItem href="/guides" title="Guides" icon={<Book className="h-5 w-5" />}>
                      Learn about common legal concepts.
                    </ListItem>
                    <ListItem href="/resources" title="Resources" icon={<Book className="h-5 w-5" />}>
                      Find helpful links and resources.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/community" className="flex items-center space-x-1 hover:text-gray-200 px-4 py-2">
                  <Users className="h-5 w-5" />
                  <span>Community</span>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/helpline" className="flex items-center space-x-1 hover:text-gray-200 px-4 py-2">
                  <Phone className="h-5 w-5" />
                  <span>Helpline</span>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/how-to-play" className="flex items-center space-x-1 hover:text-gray-200 px-4 py-2">
                  <HelpCircle className="h-5 w-5" />
                  <span>How to Play</span>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-4">
            <AIChat />
            <Link to="/login" className="flex items-center space-x-1 hover:text-gray-200">
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <AIChat />
          <button>
            <HelpCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon?: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default NavBar;
