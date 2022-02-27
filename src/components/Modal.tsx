import React, { useEffect } from 'react';
interface ParentCompProps {
   darkTheme: boolean;
   Close?: any;
   resetScroll?: any;
   ref?: any;
   scrollTo?: number;
   Wide?: boolean;
   BackgroundImage?: boolean;
   HeaderComponent?: React.ReactNode;
   SubHeaderComponent?: React.ReactNode;
   CancelComponent?: React.ReactNode;
   ChildComponent: React.ReactNode;
}

export const HeaderComponent: React.FC = ({ children }) => <>{children}</>;
export const SubHeaderComponent: React.FC = ({ children }) => <>{children}</>;
export const CancelComponent: React.FC = ({ children }) => <>{children}</>;
export const ChildComponent: React.FC = ({ children }) => <>{children}</>;

const Modal: React.FC<ParentCompProps> = (props) => {
   const {
      Close,
      scrollTo,
      resetScroll,
      CancelComponent,
      ChildComponent,
      darkTheme
   } = props;

   useEffect(() => {
      if (scrollTo && scrollTo > 0) {
         const top = document.getElementById('top');
         if (top) {
            top.scroll(0, scrollTo - 20);
         } else {
            window.scrollTo({ top: 99999, left: 0, behavior: 'smooth' });
         }
         if(resetScroll) resetScroll();
      }
   }, [scrollTo, resetScroll]);

   return (
      <>
         <div
            id={'top'}
            className={`fixed bg-modalbackgroundgray bg-opacity-75 z-50 inset-0 transition-opacity bg-cover bg-no-repeat bg-top overflow-scroll`}
            onClick={() => {
               if (Close) Close();
            }}
            aria-hidden="true"
         >
            <div className="flex items-center justify-center min-h-screen text-center">
               <div
                  className={`flex mx-3 align-bottom shadow-md text-left transform transition-all md:align-middle w-full my-2 rounded-xl max-w-lg ${darkTheme ? 'bg-secondary': 'bg-white'}`}
                  onClick={(e) => {
                     // do not close modal if anything inside modal content is clicked
                     e.stopPropagation();
                  }}
               >
                  <div className="flex flex-col h-full w-full">
                     {CancelComponent ? (
                        <div className="flex flex-row w-full content-start justify-end px-16 pt-10">
                           {CancelComponent}
                        </div>
                     ) : null}
                     {ChildComponent}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
export default Modal