$(document).ready(function () {

    $("#panel-fullscreen-calendar-view").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_calendar_view.setSize(largura_calendario, altura_calendario + 5);
            zoomAberto = true;
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            chart_calendar_view.setSize(largura_calendario, altura_calendario);
            zoomAberto = false;
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });

    $("#panel-fullscreen-dense-display").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_heatmap_large.setSize(largura_dense, altura_dense + 1);
            zoomAberto = true;
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            chart_heatmap_large.setSize(largura_dense, altura_dense);
            zoomAberto = false;
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });
	
	$("#panel-fullscreen-dense-display-meteriologico").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_heatmap_meteriologicos.setSize(largura_dense, altura_dense + 1);
            zoomAberto = true;
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            chart_heatmap_meteriologicos.setSize(largura_dense, altura_dense);
            zoomAberto = false;
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });
	
	$("#panel-fullscreen-heatmap").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_heatmap_color.setSize(chart_heatmap_large.chartWidth + 30, altura_heatmap);
            $(".blocos_6").height("100%");
            zoomAberto = true;
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            chart_heatmap_color.setSize(largura_heatmap, altura_heatmap);
            $(".blocos_6").height(530);
            zoomAberto = false;
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });
	
	$("#panel-fullscreen-dias").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_dias.setSize(chart_heatmap_large.chartWidth, 600);
            $(".blocos_6").height("100%");
            zoomAberto = true;
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            chart_dias.setSize(largura_dias, altura_dias);
            $(".blocos_6").height(530);
            zoomAberto = false;
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });

    $("#panel-fullscreen-horas").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_horas.setSize(chart_heatmap_large.chartWidth, 600);
            $(".blocos_6").height("100%");
            zoomAberto = true;
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            chart_horas.setSize(largura_horas, altura_horas);
            $(".blocos_6").height(530);
            zoomAberto = false;
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });
	
	$("#panel-fullscreen-historico").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_historico.setSize(chart_historico.containerWidth+500, 600);
            zoomAberto = true;
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            chart_historico.setSize(chart_historico.containerWidth, 400);
            zoomAberto = false;
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });

    $("#panel-fullscreen-boxplot").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_box_plot.setSize(chart_historico.containerWidth+500, 600);
            zoomAberto = true;
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            chart_box_plot.setSize(chart_historico.containerWidth, 400);
            zoomAberto = false;
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });

    $("#panel-fullscreen-historico-geral").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_historico_geral.setSize(chart_historico_geral.containerWidth, 600);
            zoomAberto = true;
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            chart_historico_geral.setSize(chart_historico_geral.containerWidth, 400);
            zoomAberto = false;
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });
	
});