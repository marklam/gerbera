/*GRB*
  Gerbera - https://gerbera.io/

  import.js - this file is part of Gerbera.

  Copyright (C) 2018 Gerbera Contributors

  Gerbera is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License version 2
  as published by the Free Software Foundation.

  Gerbera is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Gerbera.  If not, see <http://www.gnu.org/licenses/>.

  $Id$
*/

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

function addVideo(obj) {
    var chain = ['Video', 'All Video'];
    addCdsObject(obj, createContainerChain(chain));

    var dir = getRootPath(object_script_path, obj.location);

    if (dir.length > 0) {
        chain = ['Video', 'Directories'];
        chain = chain.concat(dir);
        addCdsObject(obj, createContainerChain(chain));
    }
}

function addImage(obj) {
    var chain = ['Photos', 'All Photos'];
    addCdsObject(obj, createContainerChain(chain), UPNP_CLASS_CONTAINER);

    var date = obj.meta[M_DATE];
    if (date) {
        var dateParts = date.split('-');
        if (dateParts.length > 1) {
            var year = dateParts[0];
            var month = dateParts[1];

            chain = ['Photos', 'Year', year, month];
            addCdsObject(obj, createContainerChain(chain), UPNP_CLASS_CONTAINER);
        }

        chain = ['Photos', 'Date', date];
        addCdsObject(obj, createContainerChain(chain), UPNP_CLASS_CONTAINER);
    }

    var dir = getRootPath(object_script_path, obj.location);

    if (dir.length > 0) {
        chain = ['Photos', 'Directories'];
        chain = chain.concat(dir);
        addCdsObject(obj, createContainerChain(chain));
    }
}

function addTrailer(obj) {
    var chain;

    chain = ['Online Services', 'Apple Trailers', 'All Trailers'];
    addCdsObject(obj, createContainerChain(chain));

    var genre = obj.meta[M_GENRE];
    if (genre) {
        genres = genre.split(', ');
        for (var i = 0; i < genres.length; i++) {
            chain = ['Online Services', 'Apple Trailers', 'Genres', genres[i]];
            addCdsObject(obj, createContainerChain(chain));
        }
    }

    var reldate = obj.meta[M_DATE];
    if ((reldate) && (reldate.length >= 7)) {
        chain = ['Online Services', 'Apple Trailers', 'Release Date', reldate.slice(0, 7)];
        addCdsObject(obj, createContainerChain(chain));
    }

    var postdate = obj.aux[APPLE_TRAILERS_AUXDATA_POST_DATE];
    if ((postdate) && (postdate.length >= 7)) {
        chain = ['Online Services', 'Apple Trailers', 'Post Date', postdate.slice(0, 7)];
        addCdsObject(obj, createContainerChain(chain));
    }
}

// main script part

if (getPlaylistType(orig.mimetype) === '') { 
    var arr = orig.mimetype.split('/'); 
    var mime = arr[0]; 
 
    // var obj = copyObject(orig); 
 
    var obj = orig; 
    obj.refID = orig.id; 
 
    if (mime === 'audio') { 
            addAudio(obj); 
    } 
 
    if (mime === 'video') { 
        if (obj.onlineservice === ONLINE_SERVICE_APPLE_TRAILERS) {
            addTrailer(obj);
        } else {
            addVideo(obj);
        }
    } 
 
    if (mime === 'image' && obj.title=='Cover.jpg') { 
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
