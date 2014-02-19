package org.clipboardapplet;

import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.security.AccessController;
import java.security.PrivilegedAction;

import javax.swing.JApplet;

/**
 * jquery-clipboard
 * 
 * (c) 2014 Daniel Wittner <d.wittner@gmx.de>
 */
public class ClipboardApplet extends JApplet {

	private static final long serialVersionUID = -244488238381456407L;

	public void copyText(final String text) {

		System.out.println("copyText: " + text);

		AccessController.doPrivileged(new PrivilegedAction<Object>() {

			public Object run() {

				try {
					final StringSelection stringSelection = new StringSelection(
							text);
					final Clipboard clipboard = Toolkit.getDefaultToolkit()
							.getSystemClipboard();
					clipboard.setContents(stringSelection, stringSelection);
				} catch (Exception e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}

				return new Object();
			}
		});

	}
}
