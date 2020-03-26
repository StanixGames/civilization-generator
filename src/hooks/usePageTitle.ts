import {useMemo} from 'react';
import {useLocation} from "react-router-dom";

export type PageTitleHook = [ string ];

export const usePageTitle = (): PageTitleHook => {
  const { pathname: path } = useLocation();

  const title = useMemo(() => {
    if (path.startsWith('/players')) {
      return 'Players';
    } else if (path.startsWith('/draft')) {
      return 'New Draft'
    }
    return '';
  }, [path]);

  return [
    title,
  ];
}