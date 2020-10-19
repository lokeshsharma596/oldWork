const initState = {
    isOpen: false,
    ishelpOpen:false,
    iscategoryOpen:false,
    isfolderOpen:false,
    isarticleOpen:false,
    isnotifyOpen:false,
    iscsvupload:false,
    isprofilepage:false,
    iscommentOpen:false,
    ispopup:false,
    isexport:false,
    isfeedback:false,
    addarticle:false
  };

export function toogle(state = initState, action) {
    switch (action.type) {
      case 'TOGGLE':
        return { isOpen: !state.isOpen };
      case 'HelpToggle':
        return { ishelpOpen: !state.ishelpOpen };
      case 'CategoryToggle':
        return { iscategoryOpen: !state.iscategoryOpen };
      case 'FolderToggle':
         return { isfolderOpen: !state.isfolderOpen };
      case 'ArticleToggle':
         return { isarticleOpen: !state.isarticleOpen};
      case 'NotifyToggle':
        return { isnotifyOpen: !state.isnotifyOpen };
        case 'CsvToggle':
        return { iscsvupload: !state.iscsvupload };
        case 'ProfileToggle':
          return { isprofilepage: !state.isprofilepage };
        case 'CommentToggle':
          return { iscommentOpen: !state.iscommentOpen };
        case 'PopupToggle':
          return { ispopup: !state.ispopup };
        case 'ExportToggle':
            return { isexport: !state.isexport };
        case 'FeedbackToggle':
            return { isfeedback: !state.isfeedback };
        case 'AddArticleToggle':
            return { addarticle: !state.addarticle };
      default:
        return state;
    }
  };
  