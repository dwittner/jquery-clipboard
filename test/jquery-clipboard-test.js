(function (testCase, assert, refute, $) {
	"use strict";

	testCase("$.clipboard", {

		setUp: function () {
			this.stub(console, "log");
		},

		"exists": function () {
			assert.isObject($.clipboard);
		},

		initApplet: {

			setUp: function () {

				window.deployJava = {
					runApplet: function () {
						window.clipboardApplet = {
							writeToClipboard: function () {}
						};
					}
				};
				this.stub(window.deployJava, "runApplet");
			},

			tearDown: function () {
				delete window.clipboardApplet;
			},

			"exists": function () {
				assert.isFunction($.clipboard.initApplet);
			},

			"if window.clipboard exists (IE)": {
				requiresSupportFor: {
					"window.clipboardData": typeof window.clipboardData !== "undefined"
				},

				"deployJava.runApplet isn't called": function () {

					$.clipboard.initApplet();

					refute.calledOnce(deployJava.runApplet);
				}
			},

			"if window.clipbpoard doesn't exist (no IE)": {
				requiresSupportFor: {
					"no window.clipboardData": typeof window.clipboardData === "undefined"
				},

				"deployJava.runApplet is called":  {

					"once": function () {

						$.clipboard.initApplet();

						assert.calledOnce(deployJava.runApplet);
					},

					"for 'ClipboardApplet.jar' by default": function () {

						$.clipboard.initApplet();

						assert.equals(deployJava.runApplet.getCall(0).args[0].archive,
							'ClipboardApplet.jar');
					},

					"for specified archive file": function () {

						var archiveFile = "../../ClipboardApplet.jar";

						$.clipboard.initApplet(archiveFile);

						assert.equals(deployJava.runApplet.getCall(0).args[0].archive, archiveFile);
					}
				},

				"error message is logged if applet is not loaded successfully": function () {

					$.clipboard.initApplet();

					assert.calledWith(console.log, 'ClipboardApplet initialization failed!');
				},

				"error message isn't logged if applet is loaded successfully": function () {

					window.deployJava.runApplet.restore();

					$.clipboard.initApplet();

					refute.calledWith(console.log, 'ClipboardApplet initialization failed!');
				}
			}
		},

		setData: {

			setUp: function () {
				window.clipboardApplet = {
					writeToClipboard: this.stub()
				};
			},

			tearDown: function () {
				delete window.clipboardApplet;
			},

			"exists": function () {
				assert.isFunction($.clipboard.setData);
			},

			"if window.clipboard exists (IE)": {
				requiresSupportFor: {
					"window.clipboardData": typeof window.clipboardData !== "undefined"
				},

				setUp: function () {
					this.stub(window.clipboardData, "setData");
				},

				// unfortunately window.clipboardData.setData can't be stubbed
				"//window.clipboardData.setData is called": function () {

					var data = "dataToCopy";

					$.clipboard.setData(data);

					assert.calledOnceWith(window.clipboardData.setData, "Text", data);
				}
			},

			"if window.clipbpoard doesn't exist (no IE)": {
				requiresSupportFor: {
					"no window.clipboardData": typeof window.clipboardData === "undefined"
				},

				"applet is used if configured": function () {

					var data = "dataToCopy";

					$.clipboard.setData(data);

					assert.calledOnceWith(clipboardApplet.writeToClipboard, data);
				},

				"copy fallback is used if applet throws exception": function () {

					clipboardApplet.writeToClipboard.throws();

					$.clipboard.setData("");

					assert($("#jquery-clipboard-textarea").length === 1,
						"jquery-clipboard-textarea should exist");
				},

				"copy fallback is used if applet is not configured": function () {

					delete window.clipboardApplet;

					$.clipboard.setData("");

					assert($("#jquery-clipboard-textarea").length === 1,
						"jquery-clipboard-textarea should exist");
				}
			}
		},

		getData: {

			setUp: function () {
				window.clipboardApplet = {
					readFromClipboard: this.stub()
				};
			},

			tearDown: function () {
				delete window.clipboardApplet;
			},

			"exists": function () {
				assert.isFunction($.clipboard.getData);
			},

			"if window.clipboard exists (IE)": {
				requiresSupportFor: {
					"window.clipboardData": typeof window.clipboardData !== "undefined"
				},

				setUp: function () {
					this.stub(window.clipboardData, "getData");
				},

				// unfortunately window.clipboardData.getData can't be stubbed
				"//window.clipboardData.getData is called": function () {

					$.clipboard.getData();

					assert.calledOnce(window.clipboardData.getData);
				}
			},

			"if window.clipbpoard doesn't exist (no IE)": {
				requiresSupportFor: {
					"no window.clipboardData": typeof window.clipboardData === "undefined"
				},

				"clipboardData of event param is used if passed": function () {

					var event = {
						originalEvent: {
							clipboardData: {
								getData: this.stub()
							}
						}
					};

					$.clipboard.getData(event);

					assert.calledOnceWith(event.originalEvent.clipboardData.getData, "Text");
				},

				"applet is used if configured and event param isn't passed": function () {

					$.clipboard.getData();

					assert.calledOnce(clipboardApplet.readFromClipboard);
				},

				"exception is thrown if neither event param is passed nor applet is configured":
					function () {

						delete window.clipboardApplet;

						assert.exception(function () {
							$.clipboard.getData();
						});
					}
			}
		}
	});
}(buster.testCase, buster.assert, buster.refute, jQuery));