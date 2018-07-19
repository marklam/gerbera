function addAudio(obj) { 
    var chain = new Array('Audio', 'Folders'); 
  
    /** @type{string} */ 
    var path = obj.location; 
    var extension = path.substring(path.lastIndexOf('.')+1); 
  
    //determine path of file 
    if (path.indexOf('Audio')>0 && extension in {'mp3':0,'wav':0,'wma':0,'ogg':0,'m4a':0,'flac':0} ) { 
        path=path.substring(path.indexOf('Audio')+6, path.lastIndexOf('/')); 
  
        var title = obj.meta[M_TITLE]; 
        if (!title) title = obj.title; 
  
        //set display name 
        obj.title = title; 
  
        //insert item into it's own folder as well as virtual "all files" folder 
        chain = chain.concat(path.split('/')); 
        var container = createContainerChain(chain); 
        addCdsObject(obj, container, UPNP_CLASS_CONTAINER_MUSIC_ALBUM); 
    } 
} 
 
if (getPlaylistType(orig.mimetype) == '') 
{ 
    var arr = orig.mimetype.split('/'); 
    var mime = arr[0]; 
 
    // var obj = copyObject(orig); 
 
    var obj = orig; 
    obj.refID = orig.id; 
 
    if (mime == 'audio') 
    { 
            addAudio(obj); 
    } 
 
    if (mime == 'video') 
    { 
        if (obj.onlineservice == ONLINE_SERVICE_YOUTUBE) 
            ; // addYouTube(obj); 
        else if (obj.onlineservice == ONLINE_SERVICE_APPLE_TRAILERS) 
            ; // addTrailer(obj); 
        else 
            ; // addVideo(obj); 
    } 
 
    if (mime == 'image' && obj.title=='Cover.jpg') 
    { 
        addAudio(obj); 
    } 
 
    if (orig.mimetype == 'application/ogg') 
    { 
        if (orig.theora == 1) 
            ; // addVideo(obj); 
        else 
            ; // addAudio(obj); 
    } 
} 

