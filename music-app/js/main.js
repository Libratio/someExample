var ChannelView = Backbone.View.extend({
    initialize: function () {
        this.render();
        $.getJSON('http://api.jirengu.com/fm/getChannels.php', function (data) {
            this.dataForPage(data.channels);
        }.bind(this));
    },
    render: function () {
        this.$el.html(`
        <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">私人FM</h3>
        </div>
        <div class="panel-body">
          <div id="channelList">

          </div>
        </div>
      </div>
        `)
        return this;
    },
    dataForPage: function (data) {
        var strHtml = '';
        data.forEach(function (item) {
            strHtml += `
            <div class="col-md-3 col-sm-3 col-xs-6 text-center">
                <div class="thumbnail">
                <h2><a href="#song/${item.channel_id}">${item.name}</a></h2>
                </div>
            </div>
            `
        });
        $('#channelList').html(strHtml);
    }
})


var SongView = Backbone.View.extend({
    initialize: function () {
        this.render();
        $.getJSON('http://api.jirengu.com/fm/getSong.php', { "channel": this.id }, function (data) {
            this.dataForPage(data.song);
        }.bind(this));
        this.audio = this.$el.find('#player')[0];
    },
    events: {
        'click #play': 'playMusic',
        'click #pause': 'pauseMusic',
        'click #next': 'nextMusic'
    },
    playMusic: function () {
        if (!!$(this.audio).attr('src')) {
            this.audio.play();
        } else {
            this.audio.src = $('#song').attr("data-url");
            this.audio.play();
        }
    },
    pauseMusic: function () {
        this.audio.pause();
    },
    nextMusic: function () {
       $(this.audio).removeAttr('src');
        $.getJSON('http://api.jirengu.com/fm/getSong.php', { "channel": this.id }, function (data) {
            this.dataForPage(data.song);
            this.playMusic();
        }.bind(this));
    },
    render: function () {
        this.$el.html(`
        <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">歌曲</h3>
        </div>
        <div class="panel-body">
            <audio id="player"></audio>
            <div style="margin:20px 0">
                <button id="play" class='btn btn-primary'>播放</button>
                <button id="pause" class='btn btn-info'>暂停</button>
                <button id="next" class='btn btn-danger'>下一曲</button>
            </div>
          <div id="songList">

          </div>
        </div>
      </div>
        `)
        return this;
    },
    dataForPage: function (data) {
        var strHtml = '';
        data.forEach(function (item) {
            strHtml += `
            <div class="col-md-3 col-sm-3 col-xs-6 text-center">
                <div id="song" class="thumbnail" data-url="${item.url}">
                    <img src='${item.picture}' class="img-thumbnail img-responsive">
                    <h2>${item.title}</h2>
                </div>
            </div>
            `
        });
        $('#songList').html(strHtml);
    }
})

var R = Backbone.Router.extend({
    routes: {
        '': 'index',
        'song/:id': 'song'
    },
    index: function () {
        var page = new ChannelView();
        $('#app').html(page.el);
    },
    song: function (id) {
        var page = new SongView({ id: id });
        $('#app').html(page.el);
    }
})

var r = new R();
Backbone.history.start();