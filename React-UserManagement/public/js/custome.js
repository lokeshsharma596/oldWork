$(document).ready(function(){

    //Knowledge Centre Hide Show
    // $('.addNewCatSection').hide();
    // $('.knowledge-col').click(function(){
    //     $('.knowledge-category').hide();
    //     $('.addNewCatSection').show();
    // })
   
    // right Panel Show add new, filter Category
    $('.addNewCat, .filter, .notification, .folderClick, .article, .pleaseReadBelow, .freshdesk, .addnewURL, .helpsclick, .upload-csv-xml-row').click(function(){
        $('.shadow').show();
        $('.rightPanelSection').show();
    })

    // right Panel hide add new Category
    $('.closing').click(function(){
        $('.shadow').hide();
        $('.rightPanelSection').hide();
    })

    // article hide and shoe
    $('.closingArticle').click(function(){
        //$('.shadow').hide();
        $('.article-right-col-2').hide();
    })

    $('.settingArticle, .messageArticle').click(function(){
        $('.shadow').show();
        $('.article-right-col-2').show();
    })

    $('.linkWebHelpClick').click(function(){
        $('.linkWebHelp').show();
        $('.mappedHide').hide();
    })



    // Popup script
    $('.popupClick1').click(function(){
        $('.shadow').show();
        $('.popup1').show();
    })
    $('.popupClick2').click(function(){
        $('.shadow').show();
        $('.popup2').show();
    })
    $('.popupClick3').click(function(){
        $('.shadow').show();
        $('.popup3').show();
    })
    $('.popupClick4').click(function(){
        $('.shadow').show();
        $('.popup4').show();
    })
    $('.popupClick5').click(function(){
        $('.shadow').show();
        $('.popup5').show();
    })
    $('.popupClick6').click(function(){
        $('.shadow').show();
        $('.popup6').show();
    })
    $('.popupClick7').click(function(){
        $('.shadow').show();
        $('.popup7').show();
    })
    $('.popupClick8').click(function(){
        $('.shadow').show();
        $('.popup8').show();
    })

    $('.closePopup').click(function(){
        $('.shadow').hide();
        $('.popup').hide();
    })
    



    // Page heading menu 
    // $('.page-heading > .menu-toggle').click(function(){
    //     $('.sidebarnavChild').show();
    //     alert("sasasas");
    //     $('.page-wrapper').addClass('sidebar-collapse');
    // })

    // $('.closingMenu').click(function(){
    //     $('.sidebarnavChild').hide();
    //     alert("11111111");
    //     $('.page-wrapper').removeClass('sidebar-collapse');
    // })

// ***************************** //

    // go Back button
    $('.goBack').click(function(){
        $('.knowledge-category').show();
        $('.addNewCatSection').hide();
    })
    // select/deselect all checkbox
    $('.globalCheckbox').click(function(){
        if($(this).prop("checked")) {
            $(".containerCheckBox input[type='checkbox']").prop("checked", true);
            $('.folder-checkBox').addClass('active')
        } else {
            $(".containerCheckBox input[type='checkbox']").prop("checked", false);
            $('.folder-checkBox').removeClass('active')
        }                
    });

    $(".containerCheckBox input[type='checkbox']").click(function(){
        if($(this).prop("checked")) { 
            $(this).parent().parent('.folder-checkBox').addClass('active')
            //$()
        } else { 
            $(this).parent().parent('.folder-checkBox').removeClass('active')
        }                
    });

    $(".containerCheckBox input[type='checkbox']").click(function(){
        if($(".containerCheckBox input[type='checkbox']").length == $(".containerCheckBox input[type='checkbox']:checked").length) {
            $(".globalCheckbox").prop("checked", true); 
        }else {
            $(".globalCheckbox").prop("checked", false);         
        }
    });



    $('.edit-permission').hide();
    $('.profile-settings-drp ').click(function(){
        $('.profile-Profile').hide();
        $('.edit-permission').show();
    })
    




// ***************************** //








})




