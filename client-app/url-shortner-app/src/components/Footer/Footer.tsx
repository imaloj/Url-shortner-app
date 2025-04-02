import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
    return (
        <div className="bg-slate-900  text-white text-base text-center py-5"  >
            Copy Right &#169; 2023 URLShortner. All rights reserved.
        </div>
        
  );
};

export default Footer;
