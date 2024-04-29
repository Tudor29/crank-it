var customSidemenu = function($el, options){
    var context = this;
    context.$sidemenu = jQuery($el);
    context.elements = [];
    context.$container = jQuery(options.container).length ? jQuery(options.container) : jQuery('body');
    context.id = context.$sidemenu.attr('id') || context.$sidemenu.attr('id', this.getUniqueId()).attr('id');
    context.build();
}
customSidemenu.prototype   = {
    build : function(){
        var context = this;
        context.elements = jQuery( '[data-sidemenu-item]' );
        context.buildStructure();
        return this;
    },
    buildStructure : function(){
        if( this.elements && this.elements.length ){
            this.$root = this.$root || jQuery('<ul>')
                .addClass('sidemenu nav')
                .empty()
                .appendTo(this.$sidemenu)
            ;
            this.buildSubStructure( this.$root, this.elements );
            jQuery('body').scrollspy({
                target: '#' + this.id
            });
        }
    },
    buildSubStructure : function( $root, $items ){
        var context = this;
        if( $items && $items.length ){
            $items.each(function(i, item){
                var $el = jQuery('<li>')
                    .append( jQuery('<a>')
                        .text( $(item).data('sidemenuItem') )
                        .attr('href', '#' + ( $(item).attr('id') || $(item).attr('id', context.getUniqueId() ).attr('id') ) )
                        )
                    .appendTo( $root )
                ;
            });
        }
    },
    getUniqueId : function(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        var id = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
        while( jQuery('#' + id).length ) {
            id = s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        return id;
    },
    getStopSelector : function(next){
        var sel = [];
        for (var i = 1; i < next; i++) {
            sel.push(' h' + i);
        };
        return sel.join(', ');
    }
};

jQuery(function(){
    jQuery('[data-custom-sidemenu]').each(function(i, $el){
        $el = jQuery($el);
        var options = {
            container : $el.data('customSidemenu')
        };
        $el.data('customSidemenu', new customSidemenu($el, options));
    });
    if( window.console ){
        jQuery('a').each(function(i, $el){
            $el = jQuery($el);
            var href = $el.attr('href');
            if( href && href.charAt(0) === '#' ){
                href = href.slice(1);
                if( !jQuery('#' + href).length ){
                    console.log($el);
                    console.log('Not found: ' + href);
                }
            }
        });
    }
});