import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import CommonLayout from './CommonLayout';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

    // Tin nhắn chào mừng khi màn hình Chat được mở
    useEffect(() => {
        botResponse('Chúc bạn 1 ngày tốt lành! Tôi có thể giúp gì cho bạn?Đừng ngại đặt câu hỏi nhé');
      }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const userMessage = newMessages[0]?.text?.toLowerCase() || '';
    if (userMessage.includes('xin chào') || userMessage.includes('chào') || userMessage.includes('hi') || userMessage.includes('hello')) {
      botResponse('Chúc bạn 1 ngày tốt lành!Tôi có thể giúp gì cho bạn không?Đừng ngại đặt câu hỏi nhé');
    } else if (userMessage.includes('bảo hành') || userMessage.includes('đổi trả')) {
      botResponse('Chính sách đổi trả: Đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu hàng bị hư hỏng đối với Quần, áo, thiết bị điện tử. Đổi trả trong vòng 24h kể từ lúc nhận hàng đối với tất cả các sản phẩm trái cây.');
    } else if (userMessage.includes('thời gian giao hàng') || userMessage.includes('thời gian giao hàng dự kiến')) {
      botResponse('Thời gian giao hàng dự kiến từ 2-3 ngày kể từ ngày đặt hàng. Đối với các đơn hàng gấp, hãy liên hệ với tôi qua số hotline 1900 1234.');
    } else if (userMessage.includes('hủy đơn hàng') || userMessage.includes('hủy')) {
      botResponse('Để hủy đơn hàng, vui lòng liên hệ với chúng tôi qua số hotline 1900 1234.');
    } else if (userMessage.includes('tư vấn') || userMessage.includes('tư vấn sản phẩm') || userMessage.includes('hotline')) {
      botResponse('Để được tư vấn sản phẩm, vui lòng liên hệ với chúng tôi qua số hotline 1900 1234.');
    } else if (userMessage.includes('giá') || userMessage.includes('giá cả')) {
      botResponse('Giá cả của sản phẩm sẽ được cập nhật trên website. Bạn có thể tham khảo trên website hoặc liên hệ với chúng tôi qua số hotline 1900 1234.');
    } else if (userMessage.includes('quên mật khẩu') || userMessage.includes('khôi phục mật khẩu')|| userMessage.includes('mật khẩu')) {
      botResponse('Để khôi phục mật khẩu, vui lòng đăng xuất khỏi tài khoản và chọn quên mật khẩu ở giao diện Đăng nhập. Hệ thống sẽ gửi email khôi phục mật khẩu cho bạn.');
    } else if (userMessage.includes('đặt hàng') || userMessage.includes('mua hàng')) {
      botResponse('Để mua hàng, bạn có thể dạo quanh một vòng các sản phẩm đang có trên cửa hàng của tôi hoặc có thể tìm kiếm sản phẩm trên thanh tìm kiếm. Chọn sản phẩm bạn muốn mua và thêm vào giỏ hàng');
      botResponse('Sau đó, bạn chọn giỏ hàng ở phía trên cùng và nhấn Thanh Toán để tiến hành thanh toán.');
      botResponse('Hãy kiểm tra kỹ giỏ hàng trước khi thanh toán để tránh sai sót nhé!');
      botResponse('Cảm ơn bạn đã tin tưởng mua hàng ở cửa hàng của chúng tôi ❤ ❤');
    } else if (userMessage.includes('khiếu nại') || userMessage.includes('phàn nàn') || userMessage.includes('quản lý') || userMessage.includes('báo cáo')) {
      botResponse('Để khiếu nại hoặc phàn nàn về sản phẩm, vui lòng liên hệ với chúng tôi qua số hotline 1900 1234.');
      botResponse('Bạn có thể liên hệ trực tiếp với Quản lý cửa hàng của chúng tôi:\nTrầm Hồ\nSDT: 0123456789');
    } else if(userMessage.includes('cảm ơn') || userMessage.includes('tạm biệt') || userMessage.includes('bye') || userMessage.includes('goodbye')) {
      botResponse('Cảm ơn bạn đã liên hệ với chúng tôi. Chúc bạn một ngày tốt lành!');

    }else if (userMessage.includes('tên gì') || userMessage.includes('là ai')) {
        botResponse('Mình là trợ lý ảo có thể hỗ trợ bạn trả lời, câu hỏi liên quan đến cửa hàng, sản phẩm, chính sách, hỗ trợ khach hàng, ...Hãy đặt câu cho hỏi mình nếu bạn có thắc mắc nhé!');

    }
    else {
      botResponse('Xin lỗi, tôi không hiểu ý bạn. Vui lòng thử lại. Bạn có thể liên hệ trực tiếp hotline 1900 1234 để được hỗ trợ nhanh nhất');
    }
  }, []);

  const botResponse = (text) => {
    setTimeout(() => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [
          {
            _id: Math.random(),
            text,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'ChatBot',
              avatar: 'https://cdn-icons-png.flaticon.com/512/8649/8649595.png',
            },
          },
        ])
      );
    }, 1000);
  };

  return (
    <CommonLayout title={'Chat'}>
      <View style={styles.container}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 2,
          }}
        />
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    height:670,
  },
});

export default ChatScreen;
