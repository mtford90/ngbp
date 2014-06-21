angular.module('ngBoilerplate.edit')

    .factory('testData', function ($sce) {
        return [
            {
                url: 'https://www.youtube.com/watch?v=djZBeE9yfec',
                playback: true,
                start: 5.0,
                end: 10.0,
                content: $sce.trustAsHtml(
                        '<h1>5.0s -> 10.0s</h1>' +
                        '<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet dapibus tincidunt. Nunc tincidunt, magna ut fermentum euismod, nisl velit rhoncus massa, molestie tempus metus enim ut augue. Aliquam faucibus dolor sed leo suscipit varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin justo lorem, volutpat ac eleifend ac, consequat eget sapien. Ut semper in diam et egestas. Vestibulum interdum lacinia libero rhoncus tristique. Nam tristique metus a purus sodales egestas tristique et dolor.</div>' +
                        '<div><br></div>' +
                        '<div>Sed ut viverra augue. Integer eu cursus massa, et suscipit quam. Aliquam nisl diam, vehicula accumsan convallis ac, ultrices non arcu. Etiam aliquet lorem nibh, eget molestie ante ornare non. Etiam scelerisque suscipit justo, sed condimentum eros commodo vitae. Duis eget semper lacus. Quisque sit amet diam non nisl bibendum gravida in quis sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec augue purus, auctor vel rhoncus sit amet, egestas in quam. Phasellus adipiscing ligula a turpis consequat, ut malesuada ligula rutrum. Maecenas eget erat ut sem malesuada vehicula. Donec ultricies urna ut placerat porttitor. Duis quis rutrum risus, ac tincidunt tellus. Aenean iaculis rhoncus eros.</div>' +
                        '<div><br></div>' +
                        '<div>Aenean ut mauris vulputate, vulputate tellus sed, mattis neque. Quisque arcu dui, volutpat vel lacinia nec, suscipit ut sem. Quisque quis libero euismod, congue lacus in, ultricies sapien. Praesent ut posuere purus, sed consectetur dui. Donec mollis ultrices porttitor. Aenean gravida ipsum neque, eu fermentum felis pulvinar at. Proin non lacus ut mi tristique ultricies. Aliquam malesuada nunc sed ante molestie ornare ac nec magna. Quisque faucibus sem eu mi suscipit semper. Fusce felis neque, pellentesque eget urna ut, ornare lobortis neque. Nulla ut velit mi. Fusce nec scelerisque lorem.</div>' +
                        '<div><br></div>' +
                        '<div>Mauris nec ultrices tellus. Praesent erat erat, accumsan ut tempor sed, aliquet ac urna. Proin id purus consequat, bibendum velit et, placerat nisi. Nulla at magna vel tortor venenatis dapibus. Aliquam ut mauris sed dolor consectetur eleifend eu vitae eros. Aliquam quam dolor, pretium at lorem a, luctus placerat ipsum. Proin at mauris id dolor commodo fringilla. Morbi molestie molestie egestas. Suspendisse fermentum velit at nisl rhoncus, eu mattis arcu bibendum. Vestibulum porta venenatis odio quis auctor. Vivamus euismod porttitor metus ac sollicitudin. Donec sagittis dui eu massa eleifend, ut tincidunt mauris mattis. Sed dapibus leo fringilla nisi tempus vulputate. Praesent aliquam urna nec dui dignissim, volutpat pulvinar sem pretium.</div>'
                )
            },
            {
                url: 'https://www.youtube.com/watch?v=djZBeE9yfec',
                playback: true,
                start: 30.0,
                end: 40.0,
                content: $sce.trustAsHtml(
                        '<h1>30.0s -> 40.0s</h1>' +
                        '<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer aliquet dapibus tincidunt. Nunc tincidunt, magna ut fermentum euismod, nisl velit rhoncus massa, molestie tempus metus enim ut augue. Aliquam faucibus dolor sed leo suscipit varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin justo lorem, volutpat ac eleifend ac, consequat eget sapien. Ut semper in diam et egestas. Vestibulum interdum lacinia libero rhoncus tristique. Nam tristique metus a purus sodales egestas tristique et dolor.</div>' +
                        '<div><br></div>' +
                        '<div>Sed ut viverra augue. Integer eu cursus massa, et suscipit quam. Aliquam nisl diam, vehicula accumsan convallis ac, ultrices non arcu. Etiam aliquet lorem nibh, eget molestie ante ornare non. Etiam scelerisque suscipit justo, sed condimentum eros commodo vitae. Duis eget semper lacus. Quisque sit amet diam non nisl bibendum gravida in quis sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec augue purus, auctor vel rhoncus sit amet, egestas in quam. Phasellus adipiscing ligula a turpis consequat, ut malesuada ligula rutrum. Maecenas eget erat ut sem malesuada vehicula. Donec ultricies urna ut placerat porttitor. Duis quis rutrum risus, ac tincidunt tellus. Aenean iaculis rhoncus eros.</div>' +
                        '<div><br></div>' +
                        '<div>Aenean ut mauris vulputate, vulputate tellus sed, mattis neque. Quisque arcu dui, volutpat vel lacinia nec, suscipit ut sem. Quisque quis libero euismod, congue lacus in, ultricies sapien. Praesent ut posuere purus, sed consectetur dui. Donec mollis ultrices porttitor. Aenean gravida ipsum neque, eu fermentum felis pulvinar at. Proin non lacus ut mi tristique ultricies. Aliquam malesuada nunc sed ante molestie ornare ac nec magna. Quisque faucibus sem eu mi suscipit semper. Fusce felis neque, pellentesque eget urna ut, ornare lobortis neque. Nulla ut velit mi. Fusce nec scelerisque lorem.</div>' +
                        '<div><br></div>' +
                        '<div>Mauris nec ultrices tellus. Praesent erat erat, accumsan ut tempor sed, aliquet ac urna. Proin id purus consequat, bibendum velit et, placerat nisi. Nulla at magna vel tortor venenatis dapibus. Aliquam ut mauris sed dolor consectetur eleifend eu vitae eros. Aliquam quam dolor, pretium at lorem a, luctus placerat ipsum. Proin at mauris id dolor commodo fringilla. Morbi molestie molestie egestas. Suspendisse fermentum velit at nisl rhoncus, eu mattis arcu bibendum. Vestibulum porta venenatis odio quis auctor. Vivamus euismod porttitor metus ac sollicitudin. Donec sagittis dui eu massa eleifend, ut tincidunt mauris mattis. Sed dapibus leo fringilla nisi tempus vulputate. Praesent aliquam urna nec dui dignissim, volutpat pulvinar sem pretium.</div>'
                )
            }
        ];
    });

