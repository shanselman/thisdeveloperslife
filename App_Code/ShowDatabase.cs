using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.Specialized;
using System.Text;
using WebMatrix.Data;
using System.Web.Helpers;

public class ShowDatabase
{
    public static IEnumerable<dynamic> Recent(){
        return Recent(30);
	}
    public static IEnumerable<dynamic> Recent(int count){
        var cacheKey = "RecentArticles" + count.ToString();
        var pages = WebCache.Get(cacheKey);
        if (pages == null)
        {
            var db = Database.Open("TDL2");
            var selectQueryString = "SELECT TOP "+count+" * FROM Articles ORDER BY PublishedAt DESC";
            pages = db.Query(selectQueryString);
            WebCache.Set(cacheKey, pages, 1000, true);
        }
        return pages;
	}
    public static dynamic Find(string slug) {
        var show = WebCache.Get(slug);
        if (show == null)
        {
            var db = Database.Open("TDL");
            var selectQueryString = "SELECT * FROM Articles WHERE slug = @0";
            show =  db.QuerySingle(selectQueryString, slug);
            WebCache.Set(slug, show, 1000, true);
        }
        return show;
    }
    public static string FeedContent(dynamic article){
        var sb = new StringBuilder();
        sb.AppendFormat("<p><img src='http://thisdeveloperslife.com/images/{0}' /></p>",article.LeadImage);
        sb.AppendFormat("<p>{0}</p>",article.Summary);
        sb.AppendFormat("<p><a href='http://traffic.libsyn.com/devlife/{0}'>Download Here</a></p>", article.MediaFile);
        return sb.ToString();

    }
}